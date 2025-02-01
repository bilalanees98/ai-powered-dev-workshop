import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import config from '../../config';

// Allow synchronization of schema and entities in development environment only
// Don't set this option to true in production. You can lose all of your data
let sync = false;
if ((config.environment == 'dev' || config.environment == 'development') && config.mysql.synchronization) {
  sync = config.mysql.synchronization;
  console.info('Schema sync is on');
}
export const DATA_SOURCE_OPTIONS: DataSourceOptions = {
  type: 'mysql',
  name: config.mysql.connectionName,
  database: config.mysql.dbName,
  host: config.mysql.host,
  port: Number(config.mysql.port),
  username: config.mysql.username,
  password: config.mysql.password,
  synchronize: sync,
  logging: false,
  entities: [join(__dirname + '/../entities/**/*.{ts,js}')],
  migrations: [join(__dirname + '/../migrations/**/*.{ts,js}')],
  namingStrategy: new SnakeNamingStrategy(),
  extra: { connectionLimit: config.mysql.connectionLimit },
};

export const AppDataSource = new DataSource(DATA_SOURCE_OPTIONS);
