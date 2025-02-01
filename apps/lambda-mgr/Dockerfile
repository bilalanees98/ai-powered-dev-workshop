FROM public.ecr.aws/lambda/nodejs:18 as builder
WORKDIR /app


COPY package*.json  ./

RUN mkdir -p apps/common
RUN mkdir -p apps/lambda-mgr

COPY ./apps/lambda-mgr/package.json ./apps/lambda-mgr
COPY ./apps/common/package.json ./apps/common

RUN npm install -w apps/common && npm install -w apps/lambda-mgr


COPY ./tsconfig*.json ./
COPY ./apps/lambda-mgr/ ./apps/lambda-mgr/
COPY ./apps/common/ ./apps/common/

RUN npm run build -w ./apps/common
RUN npm run build -w ./apps/lambda-mgr

CMD ["/app/apps/lambda-mgr/dist/index.handler"]
