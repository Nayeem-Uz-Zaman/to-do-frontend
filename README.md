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
docker run -p 5173:80 todo-frontend
```

This serves the built app with nginx on port 80 inside the container
(mapped to `5173` on the host). Make sure the backend is also running and
reachable at `http://localhost:8000` (e.g. via its own Dockerfile /
`docker compose up`), since the browser calls the backend directly.
