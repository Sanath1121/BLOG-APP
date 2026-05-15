# Blog App

This repository contains a full MERN blog application with a React frontend and a Node/Express backend.

## Project Structure

- `frontend/` - React + Vite client application
- `backend/` - Express + MongoDB API server

## Overview

The frontend handles the user interface for reading, creating, and managing blog content. The backend provides authentication, article APIs, author APIs, and file upload support.

## Getting Started

1. Install dependencies inside both `frontend/` and `backend/`.
2. Set up the backend environment variables in `backend/.env`.
3. Start the backend server.
4. Start the frontend development server.

## Common Commands

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

## Notes

- Start the backend before using the frontend features that depend on the API.
- Check the individual folder READMEs for more specific setup details.
