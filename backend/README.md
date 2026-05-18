# Blog App Backend

This folder contains the Express API for Blog App. It handles authentication, user and author routes, article operations, and file uploads.

## Features

- User registration and login
- Protected API routes
- Article management endpoints
- Cloudinary image upload support
- MongoDB persistence with Mongoose

## Packages Used

- `express`
- `mongoose`
- `bcryptjs`
- `jsonwebtoken`
- `cookie-parser`
- `cors`
- `dotenv`
- `multer`
- `cloudinary`
- `nodemon`

## Commands

```bash
npm install
```

```bash
npm run dev
```

```bash
npm start
```

## Deployment

- Platform: Render
- Live URL: https://blog-app-q882.onrender.com

## Environment Variables

Create a `.env` file in this folder with values for:

- `DB_URL`
- `JWT_SECRET`
- Cloudinary credentials

## Notes

- The backend should be running before using the frontend.
- API routes are mounted under `/user-api`, `/author-api`, `/admin-api`, and `/common-api`.
