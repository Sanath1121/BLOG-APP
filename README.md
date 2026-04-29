# BLOG-APP

This repository contains a MERN-stack blog application with separate `backend` and `frontend` folders.

Quick start

1. Backend

```powershell
Set-Location "backend"
npm install
npm run dev    # starts backend (nodemon) on port 4000
```

2. Frontend

```powershell
Set-Location "frontend"
npm install
npm run dev    # starts Vite dev server on port 5173
```

Notes
- Add a remote with `git remote add origin <url>` and push with `git push -u origin main`.
- Ensure you have a `.env` in `backend` with `DB_URL`, `PORT`, and `JWT_SECRET` for the server to run.
