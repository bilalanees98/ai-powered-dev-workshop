import 'dotenv/config';
import Joi from 'joi';

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'dev', 'staging', 'test').required(),
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
};
export default config;
