# Backend — Deploy to Render

This document describes how to deploy the `backend` service to Render (https://render.com).

Prerequisites
- Backend runs locally (Node.js installed).
- Code is pushed to GitHub (this repo is already pushed).

1) Ensure `start` script and `PORT` usage
- `backend/package.json` should include:
```
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```
- `backend/server.js` must use `process.env.PORT || 4000` (already set).

2) Push code to GitHub
- Repo already has backend tracked and pushed to `origin`.

3) Create Render Web Service
- Sign in to Render via GitHub and click **New + → Web Service**.
- Select this repository (or grant access if needed).
- If repository is a monorepo, set **Root Directory** to `backend`.

4) Render service settings
- Environment: `Node`.
- Build command: `npm install` (when Root Directory is `backend`).
- Start command: `npm start`.
- Plan: Free (or as desired).

5) Environment variables
- Add the following in Render Dashboard → Environment:
  - `DB_URL` (MongoDB connection string, e.g., MongoDB Atlas)
  - `JWT_SECRET`
  - `CLOUDINARY_CLOUD_NAME` (if used)
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`
- Do NOT commit any secrets to the repo.

6) Notes & troubleshooting
- Render provides `PORT` automatically — your server must read `process.env.PORT`.
- If you use a monorepo, using the `Root Directory` option is simpler than custom build commands.
- Check build logs for npm install errors (private packages, node-gyp, etc.).
- For database access, whitelist Render IPs in your MongoDB Atlas network settings or use 0.0.0.0/0 for quick testing.

7) After deploy
- Render will provide a URL like `https://your-service-name.onrender.com`.
- Update your frontend API base URL to that URL.

Example quick test
```
curl https://your-service-name.onrender.com/common-api/health
```

If you want, I can also add a `render.yaml` manifest to the repo to configure the service as code. Would you like that?