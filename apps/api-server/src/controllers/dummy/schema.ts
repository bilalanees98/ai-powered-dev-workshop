import Joi from 'joi';

export const createDummyBodySchema = Joi.object({
  hello: Joi.string().required(),
});
