# AI powered Dev workshop

The goal of this workshop is to give you a whirlwind tour of the latest AI tools and how they can be used to supercharge your development workflow. Becoming a 10x engineer is no longer a myth.

This practical aims to have you:

- Understand a legacy codebase
- Make contributions
- And resolve any issues you find along the way.

## Problem Context

One of the most common things engineers set up is a simple configuration module for their application. Generally this module loads up a few environment variables and makes them available to the rest of the application. More often than not, this module loads variables synchronously from a .env file.
However, this is a bit of an antipattern in some cases.
Imagine having to load multpiple env files for each component or worse having to load sensitive data through a non-encrypted source.
In most production environments you want to make sure that if you want to change a configuration for the entire application, you can do so in one place. You also want to make sure that you are loading sensitive data in a secure way, preferably through a vault like AWS Secrets Manager.

## Problem

This repository follows the same anti pattern of loading environment variables from a .env file. Your job, should you choose to accept it, is to refactor the codebase to use a more secure and flexible configuration solution.

All in all, **build or update the common package's configuration module to be able to asynchronously load data** from a vault (Since we didn't have the time or the money to set up a vault, we'll just simulate it by loading a configuration json from an [AWS S3 bucket](https://ai-dev-workshop-isb.s3.us-east-1.amazonaws.com/config.json)).

The configuration module must fulfil the following requirements:

- Be able to load config.json from the S3 bucket asynchronously.
- Provide a method to initialize the configuration modules i.e. force the module to load the configuration asynchronously. (simply put: have an initConfig() method).
- Provide a type-safe way to access the configuration variables.
- Provide a synchronous way to access the configuration variables in the following manner: config.get('DATABASE_HOST').
- Throw an error if a configuration variable is attempted to be accessed before it is loaded.

Note: you need to only make the common package's configuration module conform to the above requirements. The api-server component can continue using its own specific configuration module, you just need to make sure it has the variables it needs available in a .env file.

Focus purely on the api-server component.
**Your goal is to initialize the new configuration module in the api-server before it starts listenting for requests.**

To learn more about the configuration module and the rest of the application, check out the [APP_OVERVIEW.md](./APP_OVERVIEW.md) file.

## Pre-requisites

- Nodejs 18
- Docker (make sure you have docker desktop installed and have enough space on your disk)
- Typescript

## Getting started

1. Clone the repository
2. Run `npm install` from the root of the repository to install the dependencies.
3. Run `npm run localdb:create-network` to create a docker network for the local database.
4. Run `npm run localdb:start` to start the local database.
5. create a .env file in the api-server component (at apps/api-server/.env) and add the following variables:

```
PORT=80
NODE_ENV=dev
JWT_SECRET=arandomsecret
JWT_VALIDITY=24h
# --------Variables below this line can be used initially to test the application is running.
# --------Ultimately you will remove these and load them from the config.json on AWS S3 Bucket
DATABASE_HOST=app_local_db
DATABASE_NAME=app_local
DATABASE_PORT=3306
DATABASE_CONNECTION_NAME=default
DATABASE_USER=root
DATABASE_PASSWORD=randomPassword
DATABASE_SYNC_ON=true

```

6. In a new terminal, run `npm run api-server:local` to start the api-server.
