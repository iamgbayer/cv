FROM node:16 as build

WORKDIR /app
COPY packages/core packages/core
COPY packages/server packages/server

COPY package.json .
COPY lerna.json .

RUN yarn
RUN yarn -g @nestjs/cli
RUN yarn build:server

FROM node:16

WORKDIR /app
COPY packages/server/package.json .
RUN yarn --production
COPY --from=build /app/packages/server/dist ./dist
CMD yarn start:prod
