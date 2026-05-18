# Blog App Backend

This folder contains the Express API for Blog App. It handles authentication, role-based access, article management, comments, and image uploads.

## Features

- User and author registration
- Login, logout, and auth refresh
- Protected APIs for users, authors, and admins
- Article create, read, update, delete, and restore flows
- Commenting on active articles
- Cloudinary upload integration with Multer
- MongoDB persistence with Mongoose

## Packages

### Runtime

- `express`
- `mongoose`
- `bcryptjs`
- `jsonwebtoken`
- `cookie-parser`
- `cors`
- `dotenv`
- `multer`
- `cloudinary`

### Development

- `nodemon`

## Scripts

```bash
npm install
```

```bash
npm run dev
```

```bash
npm start
```

## Local Setup

1. Create a `.env` file in this folder.
2. Add the database, JWT, and Cloudinary values.
3. Install dependencies.
4. Start the server.

## Environment Variables

- `DB_URL` — MongoDB connection string
- `JWT_SECRET` — signing secret for auth tokens
- `CLOUD_NAME` — Cloudinary cloud name
- `API_KEY` — Cloudinary API key
- `API_SECRET` — Cloudinary API secret
- `PORT` — optional port override
- `NODE_ENV` — controls production behavior

## API Routes

### `POST /user-api/users`
Register a user account.

### `GET /user-api/articles`
List active articles for users.

### `PUT /user-api/articles`
Add a comment to an article.

### `POST /author-api/users`
Register an author account.

### `POST /author-api/articles`
Create a new article.

### `GET /author-api/articles/:authorId`
List articles for a specific author.

### `PUT /author-api/articles`
Update an article.

### `PATCH /author-api/articles/:id/status`
Soft delete or restore an article.

### `POST /common-api/login`
Authenticate and set the session cookie.

### `GET /common-api/logout`
Clear the auth cookie.

### `PUT /common-api/change-password`
Change the current password.

### `GET /common-api/check-auth`
Check whether the current session is authenticated.

## Deployment

- Platform: Render
- Live URL: https://blog-app-q882.onrender.com

### Render setup

- **Build command**: `npm install`
- **Start command**: `npm start`
- **Node version**: use a current LTS release
- **Environment variables**: set all values from the list above in Render

## Notes

- The backend should be started before the frontend tries to call the APIs.
- CORS is configured for the local frontend and the deployed frontend host.
- API routers are mounted under `/user-api`, `/author-api`, `/admin-api`, and `/common-api`.
