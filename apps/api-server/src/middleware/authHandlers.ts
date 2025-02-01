import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import config from 'config/config';
import { handleCustomError } from 'controllers/handleCustomError';
import { API_ERRORS, errorMessage } from 'errors/apiErrors';
import { CustomJwtPayload, JwtRequest } from 'types/jwt';
import { PowerUserRole } from '@app/common';

/**
 * @description jwt authentication for endpoint
 */
export const powerUserAuth = async (req: JwtRequest, res: Response, next: NextFunction) => {
  try {
    //sometimes 'Bearer' is added to jwt tokens by hosts. need to remove that.
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) throw new Error('missing jwt token');

    const decoded = jwt.verify(token, config.jwt.secret) as CustomJwtPayload;
    req.tokenPayload = decoded;
    req.token = token;

    next();
  } catch (error) {
    handleCustomError(next, httpStatus.UNAUTHORIZED, errorMessage('userAuth', API_ERRORS.AUTH_FAIL), error);
  }
};

/**
 * @description checks if the user with specified role is allowed to hit the endpoint
 * @param allowedRoles list of allowed roles - all roles are allowed if empty array
 */
export const roleAuth =
  (allowedRoles: PowerUserRole[] = []) =>
  async (req: JwtRequest, res: Response, next: NextFunction) => {
    try {
      if (allowedRoles.length) {
        const { role } = req.tokenPayload;
        if (!allowedRoles.includes(role)) throw new Error('User is not authorized for this action.');
      }
      next();
    } catch (error) {
      handleCustomError(next, httpStatus.UNAUTHORIZED, errorMessage('roleAuth', API_ERRORS.USER_NOT_AUTHORIZED), error);
    }
  };
