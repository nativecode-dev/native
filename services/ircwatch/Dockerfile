# STAGE: base
#------------------------------------------------------------------------------
FROM node:8-alpine AS base
WORKDIR /app
COPY package.json /app
RUN set -ex \
  && apk add yarn --no-cache \
  && yarn install --only=production \
  ;

# STAGE: build
#------------------------------------------------------------------------------
FROM base AS build
WORKDIR /app
COPY /src /app/src
COPY /types /app/types
COPY tsconfig.json /app
RUN set -ex \
  && yarn build \
  ;

# STAGE: deploy
#------------------------------------------------------------------------------
FROM base AS deploy
WORKDIR /app
COPY --from=build /app/bin /app/bin
COPY --from=base /app/node_modules /app/node_modules
ENV AMQPTS_LOGLEVEL "0"
ENV DEBUG "*"
ENV URL_QUEUE ""
ENV URL_IRC ""
CMD [ "yarn", "start" ]
