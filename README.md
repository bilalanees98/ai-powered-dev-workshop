# Backend monorepo template

This template can be used for a microservices backend based on elastic beanstalk and AWS lambdas. This repo is a monorepo which includes 2 components and a shared common package. The monorepo is managed through NPM workspaces. Any number of components/apps can be added to the repo by creating new workspaces.

## Components

- api-server - Hosts endpoints required for the frontend and admin operations. Only component responsible for running migrations.
- lambda-mgr - Lambda that can be built and run locally via docker.
- common - A common package that holds modules used across components e.g. the data layer.

Note: for more details see the readme for each component.

## Stack

- Nodejs 18
- Typeorm
- Typescript
- mysql

## Notes

- All infrastructure is on AWS. Right now there is no Infra-as-code, but thats an improvement on the roadmap.
- All components are deployed as tagged docker images. Docker images are pushed to AWS ECR.
- All deployments are manual at the moment, each component has scripts in its package.json for deployments.


## Adding more apps/components
- At the root of the repo simply run `npm init -w apps/<app-name>`.