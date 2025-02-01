import Joi from 'joi';
import 'dotenv/config';

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'dev', 'staging', 'test').required(),
    PORT: Joi.number().default(80),
    DATABASE_NAME: Joi.string().required(),
    DATABASE_HOST: Joi.string().required().description('database host, i.e db container internal ip'),
    DATABASE_PORT: Joi.number().default(3306),
    DATABASE_USER: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_CONNECTION_LIMIT: Joi.number().default(10),
    DATABASE_CONNECTION_NAME: Joi.string().default('default'),
    DATABASE_SYNC_ON: Joi.boolean().default(false).description('sync entities with schema only for dev env'),
  })
  .unknown();

const envs = {
  ...process.env,
};

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(envs);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  environment: envVars.NODE_ENV,
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
};
export default config;
