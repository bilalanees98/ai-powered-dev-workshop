import { Request, Response, NextFunction } from 'express';

import { CustomError } from '../utils/response/custom-error/CustomError';

export const errorHandler = (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  if (err.HttpStatusCode == 403) return res.status(err.HttpStatusCode).json(err.message);

  return res.status(err.HttpStatusCode).json(err.JSON);
};
