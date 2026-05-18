# Blog App

Blog App is a full-stack MERN application for publishing, reading, and managing blog content with role-based access for users and authors.

## Overview

The project has two parts:

- `frontend/` — React + Vite client application
- `backend/` — Express + MongoDB API server

The frontend handles browsing, login, registration, author tools, and protected routes. The backend provides authentication, article APIs, file upload support, and database persistence.

## Key Features

- User and author registration
- Login, logout, and session-based auth
- Article browsing and detail pages
- Author profile, writing, editing, and soft delete flows
- Commenting and profile image upload
- Cloudinary-backed media storage

## Live Deployment

- Frontend: https://blog-app-1-jrys.onrender.com
- Backend: https://blog-app-q882.onrender.com

## Project Structure

- `frontend/` — UI, routing, forms, and client-side state
- `backend/` — REST APIs, models, middleware, and services

## Tech Stack

- React 19
- Vite 7
- React Router 7
- Zustand
- React Hook Form
- Express 5
- Mongoose 9
- MongoDB
- JWT authentication
- Multer and Cloudinary for uploads

## Quick Start

1. Install dependencies in both folders.
2. Configure the backend environment variables.
3. Start the backend server.
4. Start the frontend app.

## Local Commands

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Backend:

```bash
cd backend
npm install
npm run dev
```

## Environment Variables

Backend uses:

- `DB_URL`
- `JWT_SECRET`
- `CLOUD_NAME`
- `API_KEY`
- `API_SECRET`
- `PORT` (optional)

## API Summary

- `/common-api` — login, logout, password change, auth check
- `/user-api` — user registration, article listing, comments
- `/author-api` — author registration, create/update/delete articles
- `/admin-api` — admin placeholder routes

## Development Notes

- Start the backend before testing protected frontend flows.
- The deployed frontend communicates with the deployed backend.
- See the folder-level READMEs for full setup, scripts, and deployment details.
