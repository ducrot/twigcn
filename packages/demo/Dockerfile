# Static demo site, build context is the repository root. PHP and Node versions follow .ddev/config.yaml
FROM php:8.4-cli-bookworm AS build

RUN apt-get update \
    && apt-get install -y --no-install-recommends unzip wget \
    && rm -rf /var/lib/apt/lists/*
COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer
COPY --from=node:24-bookworm-slim /usr/local/bin/node /usr/local/bin/node
COPY --from=node:24-bookworm-slim /usr/local/lib/node_modules /usr/local/lib/node_modules
RUN ln -s ../lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm \
    && ln -s ../lib/node_modules/npm/bin/npx-cli.js /usr/local/bin/npx

WORKDIR /app
COPY . .

ENV APP_ENV=prod APP_DEBUG=0
RUN npm ci
RUN cd packages/demo \
    && composer install --no-dev --optimize-autoloader --no-progress \
    && APP_SECRET="$(openssl rand -hex 32)" composer dump-env prod
RUN bash scripts/build-static.sh

FROM nginxinc/nginx-unprivileged:1.28-alpine
COPY packages/demo/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/_site /usr/share/nginx/html
EXPOSE 8080
