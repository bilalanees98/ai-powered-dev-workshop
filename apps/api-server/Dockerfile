FROM node:18-alpine AS builder
WORKDIR /app

COPY ./package*.json ./

RUN mkdir -p ./apps/common
RUN mkdir -p ./apps/api-server


COPY ./apps/api-server/package.json ./apps/api-server
COPY ./apps/common/package.json ./apps/common

RUN npm install -w apps/common && npm install -w apps/api-server

COPY ./tsconfig*.json ./
COPY ./apps/api-server/ ./apps/api-server/
COPY ./apps/common/ ./apps/common/

RUN npm run build -w ./apps/common
RUN npm run build -w ./apps/api-server

CMD [ "npm","run", "start","-w", "apps/api-server" ]