## Backend Development Notes

This file captures the practical backend workflow for this project.

### Setup Checklist

1. Create the repository and install dependencies.
2. Add `.gitignore` and `.env`.
3. Load environment variables with `dotenv`.
4. Create the Express app and configure middleware.
5. Connect to MongoDB.
6. Define schemas and models.
7. Build service functions for auth and data access.
8. Add route modules for users, authors, admins, and common auth flows.
9. Add centralized error handling.

### Core Backend Rules

- Keep request validation close to the route or service layer.
- Normalize email values before saving or querying.
- Prefer reusable service functions for auth and registration logic.
- Return clear HTTP status codes for validation, auth, and conflict errors.
- Keep uploads resilient: fail gracefully if Cloudinary is unavailable.

### Auth Flow

- Registration creates the account and stores a hashed password.
- Login verifies credentials and sets the auth cookie.
- Protected routes check the cookie and role before allowing access.
- Logout clears the cookie with the same cookie options used at login.

### Common Environment Values

- `DB_URL`
- `JWT_SECRET`
- `CLOUD_NAME`
- `API_KEY`
- `API_SECRET`
- `PORT`

### Maintenance Notes

- Keep route names aligned with the frontend API calls.
- Check CORS origins whenever frontend hosting changes.
- Prefer one clear source of truth for auth and role checks.
