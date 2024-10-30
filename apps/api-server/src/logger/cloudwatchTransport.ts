import WinstonCloudwatch from 'winston-cloudwatch';
import config from 'config/config';
import { IS_LOCAL_DEV_MODE } from 'consts/Logger';

const uploadRate = 10000; //10 secs

const awsOptions =
  config.aws.secretKey && config.aws.accessKey
    ? {
        credentials: {
          accessKeyId: config.aws.accessKey,
          secretAccessKey: config.aws.secretKey,
        },
        region: config.aws.region,
      }
    : {
        region: config.aws.region,
      };
const BASIC_CONFIG = {
  awsOptions,
  logGroupName: config.aws.logGroupName,
  uploadRate,
  silent: IS_LOCAL_DEV_MODE, //silent in development
};

const infoLogStreamName = 'info';
const errorLogStreamName = 'error';

export const CLOUDWATCH_ERROR_TRANSPORT = new WinstonCloudwatch({
  ...BASIC_CONFIG,
  logStreamName: errorLogStreamName,
  level: errorLogStreamName,
});
export const CLOUDWATCH_INFO_TRANSPORT = new WinstonCloudwatch({
  ...BASIC_CONFIG,
  logStreamName: infoLogStreamName,
  level: infoLogStreamName,
});
