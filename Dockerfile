# Lint, unit test, and build on a full Debian base.
FROM docker.io/node:14.18.0 AS build
WORKDIR /home/node/app
COPY package.json yarn.lock tsconfig.json ./
COPY public public
COPY src src
RUN yarn install
RUN yarn run build

# Use unprivileged NGINX base - nginx config will be mounted at runtime
FROM docker.io/nginxinc/nginx-unprivileged:1.21.4-alpine
COPY --from=build /home/node/app/build /usr/share/nginx/html