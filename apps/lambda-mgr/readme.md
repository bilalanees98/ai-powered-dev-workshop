## Local development

In order to start with local development:

- clone the repository
- run `npm install` from the root directory - this will install the dependencies for all workspaces
- run `npm run localdb:create-network` to create a local network for development docker containers
- run `npm run localdb:start` to start a mysql database in a docker container named `dotlocker_local_db`
- run `npm run docker:dev:build -w apps/cronjob-mgr` to create a local docker image for development
- run `npm run dev -w apps/cronjob-mgr` to start a local docker development docker container with hot reload enabled.

NOTE:

- Any changes in the DB will be persisted on the developers machine (inside the folder named `database` at the root of the monorepo)
- Hot reload is only triggered for files inside `apps/cronjob-mgr/src` and only this application is rebuilt with typescript
- In order to reflect any changes in the `apps/common` code the docker image for the `cronjob-mgr` will have to be rebuilt (`npm run docker:build -w apps/cronjob-mgr`)

## Local testing

In order to test out the lambda on your local machine:

- build and run the docker container (in dev or regular mode)
- navigate to apps/cronjob-mgr/scripts/testingCommands.txt
- This txt file includes commands to invoke the lambda for different cronjobs
- copy the command and run it from any terminal
- the lambda will be invoked with a cronjob specific payload.

NOTE: since this lambda will run multiple cronjobs the curl command will be accompanied with a payload indicating the cron job name to trigger. The curl command acts only as dummy-trigger to start the cronjob, the payload specifes which cronjob to run.

## Deployment

The cronjob-mgr is meant to be deployed on AWS lambdas. For now the deployments are manual.

In order to deploy to the lambda:

- cd to `apps/cronjob-mgr`
- run `npm run docker:build` - this will create a docker image
- run `npm run docker:start` - test out if the lambda container is running as expected
- run `npm run docker:login-publish` - this will first ask you to enter an AWS profile name, it will then authenticate with ECR, appropriately tag the docker image and push it to ECR.
- Goto AWS console and navigate to the lambda you want to deploy at. (staging-cronjob-mgr or prod-cronjob-mgr)
- Choose to `deploy a new image` and browse available images
- select the repository `dotlocker/cronjob-mgr`
- select the latest pushed docker image (or whichever one you wish to deploy).

The new image will be deployed shortly.
