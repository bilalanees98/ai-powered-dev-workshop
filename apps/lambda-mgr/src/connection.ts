import { dbCreateConnection, AppDataSource } from '@app/common';
import { DataSource } from 'typeorm';

let dataSource: DataSource | null = null;

export async function getDataSource() {
  if (!dataSource) {
    dataSource = await dbCreateConnection(AppDataSource);
  }
  return dataSource;
}
