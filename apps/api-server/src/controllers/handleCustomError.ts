import { NextFunction } from 'express';
import { logger } from 'logger';
import { CustomError } from 'utils/response/custom-error/CustomError';

/**
 * @description logs error and return error to api-request.
 * @param next Next middleware
 * @param status http error status
 * @param message error message
 * @param error error object (To log error stack for unknown errors)
 * @param errorCode custom internal error code
 */
export const handleCustomError = (
  next: NextFunction,
  status: number,
  message: string,
  error?: Error,
  errorCode?: number,
) => {
  error ? logger.error(`handleCustomError: ${error.stack || error}`) : logger.error(`handleCustomError: ${message}`);
  const customError = errorCode ? new CustomError(status, message, errorCode) : new CustomError(status, message);
  return next(customError);
};
