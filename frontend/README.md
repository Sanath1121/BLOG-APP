# Blog App Frontend

This folder contains the React client for Blog App. It provides the browsing experience, authentication screens, author dashboard flows, and protected UI routes.

## Features

- Landing page and article feed
- Register and login forms
- User and author profile screens
- Article creation, editing, and reading
- Protected routes and role-based navigation
- Toast notifications and client state management

## Packages

### Runtime

- `react`
- `react-dom`
- `react-router`
- `react-hook-form`
- `axios`
- `zustand`
- `react-hot-toast`
- `tailwindcss`
- `@tailwindcss/vite`

### Development

- `vite`
- `@vitejs/plugin-react`
- `eslint`
- `@eslint/js`
- `eslint-plugin-react-hooks`
- `eslint-plugin-react-refresh`
- `globals`
- `@types/react`
- `@types/react-dom`

## Scripts

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run preview
```

```bash
npm run lint
```

## Local Development

1. Install dependencies.
2. Start the backend server first.
3. Run the Vite dev server.

The app currently points API requests to the deployed backend at https://blog-app-q882.onrender.com.

## Routes

- `/` — home
- `/register` — registration
- `/login` — login
- `/user-profile` — user dashboard
- `/author-profile` — author dashboard
- `/author-profile/articles` — author article list
- `/author-profile/write-article` — article editor
- `/article/:id` — article details
- `/edit-article` — article edit form
- `/unauthorized` — access denied page

## Deployment

- Platform: Render
- Live URL: https://blog-app-1-jrys.onrender.com

### Render setup

Use one of these setups depending on how the service is configured:

- **Static Site**: build command `npm run build`, publish directory `dist`
- **Web Service**: build command `npm install && npm run build`, start command `npm run preview`

## Notes

- The frontend expects the backend API to be live before auth, comment, and author actions work.
- Client source code is under `src/`.
- API endpoints are hardcoded to the deployed backend URL.
