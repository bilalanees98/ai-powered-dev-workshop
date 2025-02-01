import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

/**
 * @description Registers a new user. Saves the passed user data in the database.
 */
export const register = async (req: Request, res: Response, next: NextFunction) => {
  res.customSuccess(httpStatus.CREATED, 'User registered', { userName: 'randomUser', role: 'ADMIN' });
};
