FROM node:22-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm config set fetch-timeout 600000 fetch-retries 5 \
  && npm ci --no-audit --no-fund

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY docker-entrypoint.d/40-inject-env.sh /docker-entrypoint.d/40-inject-env.sh
RUN chmod +x /docker-entrypoint.d/40-inject-env.sh

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
