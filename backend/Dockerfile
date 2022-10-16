#
# The preparation steps happen in a different container which is discarded afterwards.
# This is because the production image has no need to know about things such as "npm install",
# they just need the resulting assets.
#
FROM node:16 as builder

COPY . /app
WORKDIR /app
RUN npm install


#
# Prepare the environment, dependencies, assets, and everything that this image will need to run.
# Base it off the official nodejs image "node:16" and customise from there.
#
FROM node:16

COPY --from=builder /app /app
WORKDIR /app
ENV PORT=4000
ENTRYPOINT ["node", "/app/bin/www"]
