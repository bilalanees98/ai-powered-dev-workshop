import 'dotenv/config';
import Joi from 'joi';

const reminderEmailIntervalSchema = Joi.array().items(Joi.alternatives().try(Joi.number(), Joi.string()));

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'dev', 'staging', 'test').required(),
    REMINDER_EMAIL_LIMIT: Joi.number().required().description('number of reminder emails'),
    REMINDER_EMAIL_INTERVALS: reminderEmailIntervalSchema
      .required()
      .description('array - number of days after which email reminders are sent'),
  })
  .unknown();

const envs = {
  ...process.env,
  REMINDER_EMAIL_INTERVALS: process.env.REMINDER_EMAIL_INTERVALS.split(' '),
};

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(envs);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  environment: envVars.NODE_ENV,
  reminderEmails: {
    limit: envVars.REMINDER_EMAIL_LIMIT,
    intervals: envVars.REMINDER_EMAIL_INTERVALS,
  },
};
export default config;
