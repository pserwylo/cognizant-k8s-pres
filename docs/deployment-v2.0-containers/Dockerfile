FROM node:16 as builder

COPY . /app
WORKDIR /app
RUN npm install


FROM node:16

COPY --from=builder /app /app
WORKDIR /app
ENV PORT=4000
EXPOSE 4000
USER node
ENTRYPOINT ["node", "/app/bin/www"]
