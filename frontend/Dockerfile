FROM node:16 as builder

COPY . /app
WORKDIR /app
RUN \
  npm install && \
  npm run build

FROM nginx

COPY --from=builder /app/build /usr/share/nginx/html