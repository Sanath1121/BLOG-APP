# Quick Testing & Verification Guide

## 🧪 Test 1: Verify Migration Script Works (LOCAL)

### Prerequisites
- Backend running locally: `npm start`
- .env file with DB_URL pointing to MongoDB Atlas
- At least one old user with mixed-case email in database

### Run Migration
```bash
cd backend
node migration-normalize-emails.js
```

### Expected Results
```
✓ Connected to MongoDB
Found 5 users to process...
✓ Updated: "Sunny@gmail.com" → "sunny@gmail.com"
✓ Updated: "JohnDOE@Gmail.com" → "johndoe@gmail.com"
...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Migration Complete:
  • Updated: 3 users
  • Already normalized: 2 users
  • Total processed: 5 users
```

---

## 🧪 Test 2: Login with Various Email Cases (LOCAL)

After migration, test with different email cases:

```bash
# Test 1: Uppercase email
curl -X POST http://localhost:4000/common-api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"SUNNY@GMAIL.COM", "password":"password123"}'
# Expected: ✅ Login success

# Test 2: Mixed case
curl -X POST http://localhost:4000/common-api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"Sunny@Gmail.Com", "password":"password123"}'
# Expected: ✅ Login success

# Test 3: Lowercase (original)
curl -X POST http://localhost:4000/common-api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"sunny@gmail.com", "password":"password123"}'
# Expected: ✅ Login success

# Test 4: With spaces (should trim)
curl -X POST http://localhost:4000/common-api/login \
  -H "Content-Type: application/json" \
  -d '{"email":" SUNNY@GMAIL.COM ", "password":"password123"}'
# Expected: ✅ Login success
```

---

## 🧪 Test 3: Register New User (LOCAL)

```bash
curl -X POST http://localhost:4000/user-api/users \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "TestUser@Gmail.COM",
    "password": "password123",
    "role": "USER"
  }'
```

Then verify login works:
```bash
curl -X POST http://localhost:4000/common-api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"testuser@gmail.com", "password":"password123"}'
# Expected: ✅ Login success (email auto-lowercased)
```

---

## 🧪 Test 4: MongoDB Atlas Verification

### Check if emails are actually normalized:

**Using MongoDB Atlas Web Console:**
1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Select your cluster
3. Click "Browse Collections"
4. Select: `blog_app_db` → `users`
5. Verify emails look like: `"email": "sunny@gmail.com"` (lowercase)

### Check with MongoDB Shell:
```javascript
// In MongoDB Atlas web console terminal:
db.users.find({}).pretty()

// Look for:
// { _id: ObjectId(...), email: "sunny@gmail.com", firstName: "Sunny", ... }
// { _id: ObjectId(...), email: "johndoe@gmail.com", firstName: "John", ... }

// If you see uppercase, migration didn't run!
```

---

## 🧪 Test 5: After Deploying to Render

### 1. Check Deployment Successful
- Go to [dashboard.render.com](https://dashboard.render.com)
- Select your-backend-app
- Check "Latest Deploy" status
- Should see "✓ Deploy successful" (green checkmark)

### 2. Check Backend Logs
- In Render dashboard, go to "Logs"
- Should see: `"DB connection success"`
- Should NOT see: errors, warnings, or connection issues

### 3. Test Login on Deployed Frontend

Go to: https://blog-app-q882.onrender.com/login

**Test Case 1 - Old User (ANY case):**
```
Email: Sunny@gmail.com  (original case)
Password: [actual password]
Click "Sign In"
Expected: ✅ Redirected to user profile
```

**Test Case 2 - Old User (Lowercase):**
```
Email: sunny@gmail.com  (lowercase)
Password: [actual password]
Click "Sign In"
Expected: ✅ Redirected to user profile
```

**Test Case 3 - New User Registration:**
```
Register with: NewUser@Gmail.COM
Set password: test123
Expected: ✅ Successful registration

Then login with: newuser@gmail.com
Expected: ✅ Login works
```

---

## 🐛 Troubleshooting: If Tests Fail

### Scenario 1: Login still says "Invalid email"
**Possible causes:**
1. ❌ Migration script didn't run (emails still mixed case in DB)
2. ❌ Backend code not deployed (old version still running)
3. ❌ Database connection issue

**Solution:**
```bash
# Verify migration ran
db.users.find({email: "sunny@gmail.com"}) # Should find it
db.users.find({email: "Sunny@gmail.com"}) # Should NOT find it

# Force Render redeploy
# Render Dashboard → Select app → Manual Deploy → Deploy Latest
```

### Scenario 2: Login says "Invalid password"
**This means:**
✅ Email found successfully (email normalization works!)
❌ Password hash doesn't match

**Possible causes:**
1. User entered wrong password (typo)
2. Password hash corrupted (unlikely but possible)

**Solution:**
- Have user try password again (carefully, check caps lock)
- If still fails, password needs reset (implement forgot-password feature)

### Scenario 3: Login works but immediate logout
**Causes:**
- CORS/Cookie issue
- JWT validation issue

**Solution:**
- Already handled in code with proper CORS settings
- Clear browser cookies (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+Shift+R)

### Scenario 4: Migration script throws error
**Common errors:**

```
Error: connect ECONNREFUSED 127.0.0.1:27017
→ MongoDB not running locally / wrong DB_URL
Fix: Check .env DB_URL is correct MongoDB Atlas URI

Error: Invalid MongoDB connection string
→ Missing password or special characters not encoded
Fix: Check DB_URL, special chars need URL encoding

Error: Authentication failed
→ Wrong database credentials
Fix: Verify username/password in MongoDB Atlas → Database Access
```

---

## ✅ Success Indicators

After all fixes, you should see:

1. ✅ Old users can login with ANY email case
2. ✅ New users can register and login
3. ✅ Password changes work (old users)
4. ✅ No "Invalid email" errors for registered emails
5. ✅ Browser shows blog content after login
6. ✅ Logout works
7. ✅ Page refresh keeps user logged in (1 hour)

---

## 📞 If Everything Still Fails

**Last resort debugging:**

```bash
# Check backend logs
tail -f logs/backend.log

# Manually test database connection
node -e "
import { connect } from 'mongoose';
import { config } from 'dotenv';
config();
connect(process.env.DB_URL)
  .then(() => console.log('✓ DB connection works'))
  .catch(err => console.error('✗ DB error:', err.message));
"

# Test bcrypt
node -e "
import bcrypt from 'bcryptjs';
bcrypt.compare('password123', '\$2a\$10\$...[your hash]...').then(match => {
  console.log(match ? '✓ Password matches' : '✗ Password mismatch');
});
"
```

---

## 🎯 Next Steps

1. Run migration script locally: ✅
2. Test login with various cases: ✅
3. Push to GitHub: ✅
4. Deploy to Render: ✅
5. Test on production: ✅
6. Delete migration script (optional): ✅

You're done! 🎉
