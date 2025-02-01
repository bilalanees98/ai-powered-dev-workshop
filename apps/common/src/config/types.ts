export interface ConfigSchema {
  NODE_ENV: string;
  DATABASE_NAME: string;
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_CONNECTION_LIMIT: number;
  DATABASE_CONNECTION_NAME: string;
  DATABASE_SYNC_ON: boolean;
}
