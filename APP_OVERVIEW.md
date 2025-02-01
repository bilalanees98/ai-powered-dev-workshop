# Overview of application

This repository represents a distributed monolith backend. It is built with Nodejs and Typescript and uses Typorm to interact with a mysql database. Essentially, different components of the application communicate with the same database and this is what differentiates it from a microservice architecture.

## Monorepo
This repo is a monorepo managed through NPM workspaces.

## Components

- api-server - Hosts endpoints, runs migrations and is the main entrypoint for the app.
- lambda-mgr - Lambda that can be built and run locally via docker.
- common - A common package that holds modules used across components e.g. the data layer.

## Stack

- Nodejs 18
- Typeorm
- Typescript
- mysql

## Common package
As mentioned above there are multiple components in the application and all of them share a common package. This package holds utilities or modules that are used across components. This includes both the data layer (module used to connect to and interact with the database) and the configuration module.

The data layer holds all the ORM entities and the config module in the common package handles the loading of common configuration variables like the database connection details (host, port, user, password, etc.).

### Configuration
Each component has its own configuration module. This is used to load configuration variables specific to the component, e.g. the api-server configuration module loads the port number and the JWT secret, but it would get common configuration variables from the common package.

## Local Development
All local development is done through docker-compose so make sure you have that installed.