import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { config } from '../../config';

const getDataSourceOptions = (): DataSourceOptions => {
  return {
    type: 'mysql',
    name: config.get('DATABASE_CONNECTION_NAME'),
    database: config.get('DATABASE_NAME'),
    host: config.get('DATABASE_HOST'),
    port: config.get('DATABASE_PORT'),
    username: config.get('DATABASE_USER'),
    password: config.get('DATABASE_PASSWORD'),
    synchronize: config.get('DATABASE_SYNC_ON'),
    logging: false,
    entities: [join(__dirname + '/../entities/**/*.{ts,js}')],
    migrations: [join(__dirname + '/../migrations/**/*.{ts,js}')],
    namingStrategy: new SnakeNamingStrategy(),
    extra: { connectionLimit: config.get('DATABASE_CONNECTION_LIMIT') },
  };
};

export const getAppDataSource = () => {
  return new DataSource(getDataSourceOptions());
};
