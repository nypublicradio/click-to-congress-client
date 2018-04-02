import Controller from 'ember-controller';
import fetch from 'fetch';
import config from '../config/environment';
import computed from 'ember-computed';
import Changeset from 'ember-changeset';
import {
  validateFormat
} from 'ember-changeset-validations/validators';
import lookupValidator from 'ember-changeset-validations';
import { task } from 'ember-concurrency';

const PhoneValidation = {
  phoneNumber: validateFormat({
    type: 'phone',
    message: (key, type, value) => `${value} is not a valid phone number`,
    allowBlank: true
  })
};

function formatPhoneNumber(number) {
    if (!number) {
      return false;
    }
    let formatted = number.replace(/[-\(\(\W\.]/g, '');
    if (formatted.slice(0, 1) !== '1') {
      return '1' + formatted;
    } else {
      return formatted;
    }
}

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.changeset = new Changeset(this, lookupValidator(PhoneValidation), PhoneValidation);
  },

  formattedPhoneNumber: computed('phoneNumber', function() {
    let number = this.get('phoneNumber');
    return formatPhoneNumber(number);
  }),

  lookup: task(function*(address) {
    let response = yield fetch(`${config.API}/${config.API_NAMESPACE}/v1/lookup?address=${address}`);
    let {reps, normalizedInput, districts, error} = yield response.json();
    if (error) {
      this.set('serverError', error);
    } else {
      let normalized = Object.keys(normalizedInput).map(k => normalizedInput[k]).join(', ');
      this.setProperties({reps, address: normalized, districts});
    }
  }).drop(),

  actions: {
    call(phone) {
      if (this.changeset.get('isValid')) {
        this.changeset.save();
      }
      let number = formatPhoneNumber(phone);
      fetch(`${config.API}/${config.API_NAMESPACE}/v1/call?my_number=${this.get('formattedPhoneNumber')}&dial_out=${number}`);
    }
  }
});
