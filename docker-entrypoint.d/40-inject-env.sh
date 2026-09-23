#!/bin/sh
set -e

cat > /usr/share/nginx/html/env.js <<EOF
window.APP_CONFIG = {
  API_URL: "${API_URL:-}"
};
EOF
