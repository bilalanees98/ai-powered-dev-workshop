import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { errorMessage, API_ERRORS } from '../../errors/apiErrors';
import { handleCustomError } from '../handleCustomError';

/**
 *
 * @description This handler is for testing only
 */
export const createDummy = async (req: Request, res: Response, next: NextFunction) => {
  const { hello } = req.body;
  try {
    const createdDummy = { hello };
    res.customSuccess(httpStatus.OK, 'success', { createdDummy });
  } catch (error) {
    return handleCustomError(
      next,
      httpStatus.BAD_REQUEST,
      errorMessage('createDummy', API_ERRORS.INTERNAL_SERVER_ERROR),
      error.message || error,
    );
  }
};
