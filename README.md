# to-do-frontend

Minimal React (Vite) frontend for a to-do list app. Talks to the
[todo-backend](../backend) FastAPI service via three endpoints:
`GET /todos`, `POST /todos`, `PATCH /todos/{id}/done`.

## Run locally

```bash
npm install
npm run dev
```

By default the app calls the backend at `http://localhost:8000`. Override
with a `VITE_API_URL` env var if the backend runs elsewhere.

## Run with Docker

```bash
docker build -t todo-frontend .
docker run -p 5173:80 -e API_URL=http://localhost:8000 todo-frontend
```

This serves the built app with nginx on port 80 inside the container
(mapped to `5173` on the host). Make sure the backend is also running and
reachable at the URL you passed, since the browser calls the backend
directly.

### Pointing at a deployed backend

The API URL is resolved at **container startup**, not at build time, so
the same image works against any backend without rebuilding:

- `docker-entrypoint.d/40-inject-env.sh` runs automatically when the nginx
  container starts (this is a built-in hook of the official `nginx` image)
  and writes the `API_URL` env var into a small `env.js` file served
  alongside the app.
- `index.html` loads that file before the app bundle, and `App.jsx` reads
  `window.APP_CONFIG.API_URL` first.

So on any cloud platform, just set the **runtime** environment variable
`API_URL` on the frontend service to your deployed backend's URL:

```bash
docker run -p 5173:80 -e API_URL=https://your-backend.example.com todo-frontend
```

No rebuild needed if the backend URL changes later — only a container
restart.

If deploying to a static-site host (Vercel/Netlify/etc.) that runs
`npm run build` directly instead of this Dockerfile, set `VITE_API_URL` in
that platform's **build** environment variables instead — `App.jsx` falls
back to `import.meta.env.VITE_API_URL` when `window.APP_CONFIG` isn't
present.
