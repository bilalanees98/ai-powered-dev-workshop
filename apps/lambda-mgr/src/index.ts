import { getDataSource } from './connection';

interface EventBridgeEvent {
  cronJobType: 'processTxs' | 'processReminderEmails' | 'deleteExpiredOtps';
}

async function cronHandler(receivedEvent: any) {
  console.log('receivedEvent: ', receivedEvent);
  const event: EventBridgeEvent = JSON.parse(JSON.stringify(receivedEvent)) as EventBridgeEvent;
  if (!event || !event.cronJobType) {
    throw new Error('received event is either null or does not have the cronJobType property');
  }
  console.log('event: ', event);
  const queryRunner = (await getDataSource()).createQueryRunner();
  const manager = queryRunner.manager;
  await queryRunner.connect();

  try {
    switch (event.cronJobType) {
      case 'processTxs':
        console.log('processing txs');
        break;

      default:
        console.log(`Unknown event of type: ${event.cronJobType} - ignoring`);
        break;
    }
  } catch (error) {
    console.error('Error in running cron', error);
  } finally {
    console.log('attempting to release queryRunner');
    await queryRunner.release();
  }
}

export const handler = cronHandler;
