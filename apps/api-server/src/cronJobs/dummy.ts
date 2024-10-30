import { CronJob } from 'cron';
import { logger } from 'logger';

export const performDummyTask = new CronJob('0 */12 * * *', async () => {
  logger.info('performing dummy task');
});
