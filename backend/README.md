# Blog App Backend

This is the backend for the Blog App. It is built with Node.js, Express, and MongoDB and provides the API used by the frontend.

## Features

- User authentication and protected routes
- Blog article CRUD operations
- Author-specific APIs
- File uploads with Cloudinary and Multer
- MongoDB data models for users and articles

## Tech Stack

- Node.js
- Express
- MongoDB and Mongoose
- JSON Web Token authentication
- Cloudinary
- Multer

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Start the server in production mode:

```bash
npm start
```

## Environment Variables

Create a `.env` file in this folder and configure the required values for your database, authentication, and Cloudinary setup.

## Notes

- Make sure MongoDB is running before starting the backend.
- The backend API is intended to work together with the frontend in the `frontend/` folder.
