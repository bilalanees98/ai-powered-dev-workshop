import { validateStacksAddress } from '@stacks/transactions';
import Joi from 'joi';

function validateFqn(fqn: string) {
  const parts = fqn.split('.');
  return parts.length === 2;
}

const customJoi = Joi.extend((joi) => ({
  type: 'stacksAddress',
  base: joi.string(),
  messages: {
    'stacksAddress.invalid': '"{{#label}}" must be a valid Stacks address',
  },
  //   @ts-ignore
  validate(value, helpers) {
    if (!validateStacksAddress(value)) {
      return { value, errors: helpers.error('stacksAddress.invalid') };
    }
  },
})).extend((joi) => ({
  type: 'fullyQualifiedName',
  base: joi.string(),
  messages: {
    'fullyQualifiedName.invalid': '"{{#label}}" must be a valid fully qualified name',
  },
  // @ts-ignore
  validate(value, helpers) {
    if (!validateFqn(value)) {
      return { value, errors: helpers.error('fullyQualifiedName.invalid') };
    }
  },
}));

export default customJoi;
