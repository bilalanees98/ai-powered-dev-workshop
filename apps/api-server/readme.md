# Overview

The api server (api-server) can be used to host any number of api endpoints. It can be deployed to elastic beanstalk as a docker image.

### Tech stack

- Nodejs v18 LTS
- Typescript
- Docker

# Local dev

The api-server is an app inside a monorepo. So to start local development, do the following:

## First time set up

- npm run `npm run localdb:create-network` from the root of the repo - this creates a common docker network.

## Every other run

- Clone the repository
- run `npm run install` from the root of the monorepo
- run `npm run localdb:start` from the root of the monorepo - the api-server by default connects to the local database.
- run `npm run api-server:local` from the root to build local dependencies and start a local server.

Note: View the [apps/api-server/package.json](./package.json) for more build and run commands.

## Deployments

The api-server is deployed to a beanstalk environment and the environment is configured to pull the specified docker image from ECR. In order to trigger the beanstalk env to pull the latest docker image EB CLI is required.

Note: AWS credentials and an EB CLI profile for the relevant AWS account are required for deployments.

### First time setup

- [Install EB CLI](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html)
- cd to apps/api-server
- run `eb init`
- Follow all the steps, DO NOT add CodeCommit during setup.

### Every other deployment

- cd to apps/api-server
- run `IMAGE_TAG=<tag-name> npm run docker:build` - this will build a docker image with the specified tag. This could be anything (including versions like v1.0.0)
- run `IMAGE_TAG=<tag-name> npm run docker:start` - test out if the server is running correctly
- run `IMAGE_TAG=<tag-name> npm run docker:login-publish` - this will first ask you to enter an AWS profile name, it will then authenticate with ECR, appropriately tag the docker image and push it to ECR.
- once the image is pushed, run `IMAGE_TAG=<tag-name> npm run deploy:image:<staging or prod>` - this will trigger the beanstalk env to take a pull of the ECR docker image with the specified tag and restart the server.

