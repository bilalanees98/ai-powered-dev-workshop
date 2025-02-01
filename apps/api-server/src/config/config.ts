import Joi from 'joi';
import 'dotenv/config';

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'dev', 'staging', 'test').required(),
    PORT: Joi.number().default(80),
    JWT_SECRET: Joi.string().required().description('the secret key used for generating jwt tokens'),
    JWT_VALIDITY: Joi.string().default('30m').description('the time a jwt token is valid for'),
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
  port: envVars.PORT,
  jwt: {
    secret: envVars.JWT_SECRET,
    validity: envVars.JWT_VALIDITY,
  },
};
export default config;
