// Placeholder for local dev (vite serves this as-is from /public).
// In the Docker image, docker-entrypoint.d/40-inject-env.sh overwrites this
// file at container *startup* with the real runtime API_URL.
window.APP_CONFIG = {
  API_URL: "",
};
