FROM node:18-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install

COPY . .

RUN npm run build

COPY infrastructure/migrations dist/infrastructure/migrations

FROM node:18-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --production

COPY --from=build /app/dist .

EXPOSE 80
CMD [ "node", "index.js" ]