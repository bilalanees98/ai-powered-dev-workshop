import Joi from 'joi';
import { ConfigSchema } from './types';
import { fetchConfigFromS3 } from '../utils';

const envVarsSchema = Joi.object<ConfigSchema>({
  NODE_ENV: Joi.string().valid('production', 'development', 'dev', 'staging', 'test').required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().default(3306),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_CONNECTION_LIMIT: Joi.number().default(10),
  DATABASE_CONNECTION_NAME: Joi.string().default('default'),
  DATABASE_SYNC_ON: Joi.boolean().default(false),
}).unknown();

export class ConfigService {
  private config: Record<string, string | boolean | number> | null = null;

  async loadConfig(): Promise<void> {
    if (this.config) return;

    console.log('Loading configuration...');
    const nodeEnv = process.env.NODE_ENV || 'development';

    let parameters: Record<string, string>;

    console.log('Loading configuration from S3...');
    const s3Config = await fetchConfigFromS3();

    if (!s3Config) {
      throw new Error('Failed to fetch configuration from S3');
    }

    parameters = s3Config;

    // Automatically parse booleans and numbers
    const parsedParameters = this.autoParseValues(parameters);

    // Validate and set the configuration
    const { value, error } = envVarsSchema.validate(parsedParameters, { allowUnknown: true });

    if (error) {
      console.error('Config validation error:', error.message);
      throw new Error(`Config validation error: ${error.message}`);
    }

    this.config = value;
    console.log('Configuration successfully loaded.');
  }

  private autoParseValues(parameters: Record<string, string>): Record<string, any> {
    const parsed: Record<string, any> = {};

    for (const [key, value] of Object.entries(parameters)) {
      if (typeof value === 'string') {
        if (value.toLowerCase() === 'true') {
          parsed[key] = true;
        } else if (value.toLowerCase() === 'false') {
          parsed[key] = false;
        } else if (!isNaN(Number(value))) {
          parsed[key] = Number(value);
        } else {
          parsed[key] = value; // Leave non-boolean, non-numeric strings as-is
        }
      } else {
        parsed[key] = value; // Already parsed correctly
      }
    }

    return parsed;
  }

  get<T extends string | number | boolean = string>(key: string): T {
    if (!this.config) {
      throw new Error('Configuration not loaded. Call `loadConfig()` first.');
    }

    const value = this.config[key];
    if (value === undefined) {
      throw new Error(`Configuration key "${key}" not found.`);
    }

    return value as T;
  }
}

export const configService = new ConfigService();
