FROM node:15.4 as build

WORKDIR /app
COPY package*.json /
RUN npm install
RUN npm install -g @nestjs/cli
COPY . .
RUN npm run build

FROM node:15.4

WORKDIR /app
COPY package.json .
RUN npm install --only=production
COPY --from=build /app/dist ./dist
COPY --from=build /app/src/modules/articles/articles.graphql ./dist
CMD npm run start:prod
