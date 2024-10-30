import { Response, NextFunction, Request } from 'express';
import httpStatus from 'http-status';
import Joi from 'joi';
import { handleCustomError } from 'controllers/handleCustomError';
import { errorMessage } from 'errors/apiErrors';
import { RequestProperty } from 'types';

/**
 * @description validates request body against provided schema
 */
export const validationHandler =
  (schema: Joi.AnySchema, property: RequestProperty) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(req[property]);
      if (error == null) {
        next(); //no errors found in json
      } else {
        const { details } = error;
        const message = details.map((i) => i.message).join(',');
        throw new Error(message);
      }
    } catch (error) {
      handleCustomError(next, httpStatus.BAD_REQUEST, errorMessage('validationHandler', error.message), error);
    }
  };
