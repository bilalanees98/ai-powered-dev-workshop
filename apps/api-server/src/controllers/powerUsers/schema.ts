import { PowerUserRole } from '@app/common';
import Joi from 'joi';

/**
 * @description Schema for registering a new user
 */
export const registerBodySchema = Joi.object({
  user_name: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(6).required(),
  role: Joi.string()
    .valid(...Object.values(PowerUserRole))
    .disallow(PowerUserRole.SUPER_ADMIN) // Super Admin cannot be created manually
    .required()
    .label('User Role'),
});
