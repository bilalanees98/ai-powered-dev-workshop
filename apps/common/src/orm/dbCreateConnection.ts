import { DataSource } from 'typeorm';
import { sleep } from '../utils';
// import { logger } from 'logger';

export const dbCreateConnection = async (AppDataSource: DataSource, retry = 0): Promise<DataSource> => {
  try {
    if (AppDataSource.isInitialized) {
      console.info(`Database is already initialized. Database: '${AppDataSource.options.database}'`);
      return AppDataSource;
    }
    await AppDataSource.initialize().then((conn) => {
      console.info(`Database connection success. Database: '${conn.options.database}'`);
    });
    return AppDataSource;
  } catch (err) {
    if (retry < 3) {
      console.error('Cannot connect to database. Retrying again in 5 seconds');
      await sleep(5000);
      retry++;
      return await dbCreateConnection(AppDataSource, retry);
    }
    console.error(`Failed to initialize database`);
    throw err;
  }
};
