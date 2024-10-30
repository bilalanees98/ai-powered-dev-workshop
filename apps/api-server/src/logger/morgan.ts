import { Request, Response } from 'express';
import morgan from 'morgan';
import logger from './logger';

morgan.token('message', (_req: Request, res: Response) => res.locals['errorMessage'] || '');
morgan.token('body', (_req: Request, res: Response) => JSON.stringify(_req.body) || '');
morgan.token('params', (_req: Request, res: Response) => JSON.stringify(_req.params) || '');
morgan.token('origin', (_req: Request, res: Response) => _req.header['Origin'] || '');

const successResponseFormat =
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :origin :body :params :res[content-length] ":referrer" ":user-agent"';
const errorResponseFormat =
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :origin :body :params :res[content-length] ":referrer" ":user-agent"';
const successHandler = morgan(successResponseFormat, {
  skip: (_req: Request, res: Response) => _req.url == '/health' || res.statusCode >= 400,
  stream: {
    write: (message: string) => logger.info(message.trim()),
  },
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (_req: Request, res: Response) => res.statusCode < 400,
  stream: { write: (message: string) => logger.error(message.trim()) },
});

export default {
  successHandler,
  errorHandler,
};
