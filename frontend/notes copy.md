## Frontend Development Notes

This file keeps the frontend setup and implementation patterns in one place.

### Project Setup

1. Create the app with Vite.
2. Clear the starter styles if needed.
3. Install Tailwind and the Vite plugin.
4. Add the Tailwind import to `src/index.css`.
5. Restart the dev server after config changes.

### Tailwind Setup

```bash
npm install tailwindcss @tailwindcss/vite
```

Add the plugin in `vite.config.js`:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

Add this to `src/index.css`:

```css
@import "tailwindcss";
```

### Forms

Use `react-hook-form` for most form handling.

```bash
npm install react-hook-form
```

Pattern:

```js
import { useForm } from "react-hook-form";

const { register, handleSubmit } = useForm();
```

### Side Effects

- Use `useEffect(() => {})` only when a side effect should run after render.
- Use `useEffect(() => {}, [])` for one-time work on mount.
- Use dependency arrays when the effect should respond to specific state changes.

### App Conventions

- Keep API calls in store or service helpers when possible.
- Use protected routes for role-gated screens.
- Keep form validation close to the form component.
- Centralize reusable UI patterns in `components/`.

### Current Route Map

- Home, login, register, user profile, author profile, article details, edit article, unauthorized view.

### Troubleshooting

- If Tailwind classes do not apply, verify the plugin config and CSS import.
- If auth requests fail, confirm the backend URL and cookie behavior.
- If route navigation breaks after deploy, verify `react-router` version compatibility.
