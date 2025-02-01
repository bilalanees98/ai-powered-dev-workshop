import { DataSource } from 'typeorm';
import { getAppDataSource } from './orm/config';
import { dbCreateConnection } from './orm/dbCreateConnection';

let dataSource: DataSource | null = null;

export const getDataSource = async (): Promise<DataSource> => {
  if (!dataSource) {
    dataSource = await dbCreateConnection(getAppDataSource());
  }
  return dataSource;
};
