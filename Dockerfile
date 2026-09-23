FROM node:22-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm config set fetch-timeout 600000 fetch-retries 5 \
  && npm ci --no-audit --no-fund

COPY . .
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
