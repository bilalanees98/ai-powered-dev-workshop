import 'reflect-metadata';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors, { CorsOptions, CorsOptionsDelegate } from 'cors';
import express, { Request } from 'express';
import helmet from 'helmet';
import httpStatus from 'http-status';
import config from 'config/config';
import { ALL_ORIGINS_ALLOWED_ROUTES } from 'consts/Cors';
import { logger } from 'logger';
import morgan from 'logger/morgan';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { errorHandler } from './middleware/errorHandler';
import routes from './routes';
import './utils/response/customSuccess';
import { initConfig, config as commonConfig } from '@app/common';

export const app = express();
const allowedOrigins: string[] = ['https://localhost:80'];

//https://btc-us.atlassian.net/browse/BTC-584
const corsOptionsDelegate: CorsOptionsDelegate = function (
  req: Request,
  callback: (err: Error | null, options?: CorsOptions) => void,
) {
  if (
    allowedOrigins.includes(req.header('Origin')) ||
    ALL_ORIGINS_ALLOWED_ROUTES.some((route) => req.url.includes(route))
  ) {
    callback(null, { origin: true });
  } else {
    callback(new CustomError(httpStatus.FORBIDDEN, 'unknown origin: not allowed by cors'));
  }
};

/**
 * Placing status and health check endpoints before cors middleware
 * Or else beanstalk environment health check goes into the red as origins are not defined there */
app.get('/', (_req, res) => {
  //general status check endpoint
  res.send({ status: 'OK' });
});

if (config.environment === 'dev' || config.environment === 'development') {
  app.use(cors());
} else {
  app.use(cors(corsOptionsDelegate));
}

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));

//sets up logging
if (config.environment !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// compress responses
app.use(compression());

app.use('/', routes);

// return 404 for unknown requests
app.use((_req, _res, next) => {
  next(new CustomError(httpStatus.NOT_FOUND, 'Not found'));
});

app.use(errorHandler);

(async () => {
  // uncomment the next line to see the server throw a 'configuration not loaded' error
  // console.log('NODE_ENV: ', commonConfig.get('NODE_ENV'));
  console.log('Initializing config');
  await initConfig();
  console.log('DATABASE_NAME: ', commonConfig.get('DATABASE_NAME'));
  const port = config.port;
  app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
  });
})();
