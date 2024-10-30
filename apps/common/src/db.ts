import { DataSource } from 'typeorm';
import { AppDataSource } from './orm/config';
import { dbCreateConnection } from './orm/dbCreateConnection';

let dataSource: DataSource | null = null;

export const getDataSource = async (): Promise<DataSource> => {
  if (!dataSource) {
    dataSource = await dbCreateConnection(AppDataSource);
  }
  return dataSource;
};
