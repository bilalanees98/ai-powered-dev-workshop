import Joi from 'joi';
import 'dotenv/config';
import { config as commonConfig } from '@app/common';

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'dev', 'staging', 'test').required(),
    PORT: Joi.number().default(80),
    HIRO_API_KEY: Joi.string().required(),
    DATABASE_NAME: Joi.string().required(),
    DATABASE_HOST: Joi.string().required().description('database host, i.e db container internal ip'),
    DATABASE_PORT: Joi.number().default(3306),
    DATABASE_USER: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_CONNECTION_LIMIT: Joi.number().default(10),
    DATABASE_CONNECTION_NAME: Joi.string().default('default'),
    DATABASE_SYNC_ON: Joi.boolean().default(false).description('sync entities with schema only for dev env'),
    DOMAIN_COST_USD: Joi.number().required(),
    JWT_SECRET: Joi.string().required().description('the secret key used for generating jwt tokens'),
    JWT_VALIDITY: Joi.string().default('30m').description('the time a jwt token is valid for'),
    AWS_ACCESS_KEY: Joi.string().description(
      'Access key for using AWS services - will be used used by AWS SDK if added, otherwise will look for machine credentials',
    ),
    AWS_SECRET_KEY: Joi.string().description(
      'Secret key for using AWS services - will be used used by AWS SDK if added, otherwise will look for machine credentials',
    ),
    AWS_REGION: Joi.string().required().description('Region for all AWS services'),
    AWS_LOG_GROUP_NAME: Joi.string().required().description('Cloudwatch log group name'),
  })
  .unknown();

const envs = {
  ...process.env,
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS.split(' '),
};

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(envs);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  environment: envVars.NODE_ENV,
  port: envVars.PORT,
  allowedOrigins: envVars.ALLOWED_ORIGINS,

  jwt: {
    secret: envVars.JWT_SECRET,
    validity: envVars.JWT_VALIDITY,
  },

  mysql: {
    dbName: envVars.DATABASE_NAME,
    host: envVars.DATABASE_HOST,
    port: envVars.DATABASE_PORT,
    username: envVars.DATABASE_USER,
    password: envVars.DATABASE_PASSWORD,
    connectionLimit: envVars.DATABASE_CONNECTION_LIMIT,
    connectionName: envVars.DATABASE_CONNECTION_NAME,
    synchronization: envVars.DATABASE_SYNC_ON,
  },
  aws: {
    accessKey: envVars.AWS_ACCESS_KEY,
    secretKey: envVars.AWS_SECRET_KEY,
    logGroupName: envVars.AWS_LOG_GROUP_NAME,
    region: envVars.AWS_REGION,
  },
};
export default config;
