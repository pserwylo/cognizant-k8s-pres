FROM node:16 as builder

COPY . /app
WORKDIR /app
RUN \
  npm install && \
  npm run build

FROM nginxinc/nginx-unprivileged

COPY --from=builder /app/build /usr/share/nginx/html
