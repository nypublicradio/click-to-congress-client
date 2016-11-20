import {
  validateLength,
  validateFormat
} from 'ember-changeset-validations/validators';

export default {
  zipCode: [
    validateFormat({ regex: /^\d*$/, message: '{description} must be all numbers'}),
    validateLength({ min: 1, max: 6})
  ],
  phoneNumber: validateFormat({
    type: 'phone',
    message: (key, type, value) => `${value} is not a valid phone number`
  })
};
