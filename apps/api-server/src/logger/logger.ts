import winston from 'winston';
import { IS_LOCAL_DEV_MODE } from 'consts/Logger';
import config from '../config/config';
import { CLOUDWATCH_ERROR_TRANSPORT, CLOUDWATCH_INFO_TRANSPORT } from './cloudwatchTransport';

interface LoggingInfo {
  level: string;
  message: string;
  timestamp: string;
}

const enumerateErrorFormat = winston.format((info: LoggingInfo) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  level: IS_LOCAL_DEV_MODE ? 'debug' : 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    enumerateErrorFormat(),
    config.environment === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf((info: LoggingInfo) => `[${info.timestamp}] ${info.level}: ${info.message}`),
  ),
  transports: [
    new winston.transports.Console({
      silent: !IS_LOCAL_DEV_MODE, //silent in prod and staging
      stderrLevels: ['error'],
    }),
    CLOUDWATCH_ERROR_TRANSPORT,
    CLOUDWATCH_INFO_TRANSPORT,
  ],
});

export default logger;
