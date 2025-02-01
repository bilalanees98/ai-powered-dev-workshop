import Joi from 'joi';

function validateFqn(fqn: string) {
  const parts = fqn.split('.');
  return parts.length === 2;
}

const customJoi = Joi.extend((joi) => ({
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
