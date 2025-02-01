import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import config from '../../config';

export const DATA_SOURCE_OPTIONS: DataSourceOptions = {
  type: 'mysql',
  name: config.mysql.connectionName,
  database: config.mysql.dbName,
  host: config.mysql.host,
  port: Number(config.mysql.port),
  username: config.mysql.username,
  password: config.mysql.password,
  synchronize: config.mysql.synchronization,
  logging: false,
  entities: [join(__dirname + '/../entities/**/*.{ts,js}')],
  migrations: [join(__dirname + '/../migrations/**/*.{ts,js}')],
  namingStrategy: new SnakeNamingStrategy(),
  extra: { connectionLimit: config.mysql.connectionLimit },
};

export const AppDataSource = new DataSource(DATA_SOURCE_OPTIONS);
