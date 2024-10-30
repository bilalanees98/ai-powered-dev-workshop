FROM public.ecr.aws/lambda/nodejs:18 as builder
WORKDIR /app


COPY package*.json  ./

RUN mkdir -p apps/common
RUN mkdir -p apps/cronjob-mgr

COPY ./apps/cronjob-mgr/package.json ./apps/cronjob-mgr
COPY ./apps/common/package.json ./apps/common

RUN npm install -w apps/common && npm install -w apps/cronjob-mgr


COPY ./tsconfig*.json ./
COPY ./apps/cronjob-mgr/ ./apps/cronjob-mgr/
COPY ./apps/common/ ./apps/common/

RUN npm run build -w ./apps/common
RUN npm run build -w ./apps/cronjob-mgr

CMD ["/app/apps/cronjob-mgr/dist/index.handler"]
