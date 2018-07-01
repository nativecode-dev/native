FROM node:8-alpine AS BUILD

COPY /src /app/src
COPY /types /app/types
COPY tsconfig.json /app
COPY package.json /app

WORKDIR /app

RUN set -ex \
  && apk add yarn --no-cache \
  && yarn build \
  ;
