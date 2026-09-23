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
docker build -t todo-frontend --build-arg VITE_API_URL=http://localhost:8000 .
docker run -p 5173:80 todo-frontend
```

This serves the built app with nginx on port 80 inside the container
(mapped to `5173` on the host). Make sure the backend is also running and
reachable at the URL you passed, since the browser calls the backend
directly.

### Pointing at a deployed backend

`VITE_API_URL` is a **build-time** value — Vite bakes it into the static
JS bundle, so it must be set when the image is built, not when the
container starts:

```bash
docker build -t todo-frontend --build-arg VITE_API_URL=https://your-backend.example.com .
```

If deploying to a static-site host (Vercel/Netlify/etc.) instead of this
Dockerfile, set `VITE_API_URL` in that platform's build environment
variables so it's picked up during `npm run build`.
