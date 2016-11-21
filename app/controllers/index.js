import Ember from 'ember';
import fetch from 'fetch';
import config from '../config/environment';
import set from 'ember-metal/set';
import computed from 'ember-computed';
import Changeset from 'ember-changeset';
import {
  validateFormat
} from 'ember-changeset-validations/validators';
import lookupValidator from 'ember-changeset-validations';

const PhoneValidation = {
  phoneNumber: validateFormat({
    type: 'phone',
    message: (key, type, value) => `${value} is not a valid phone number`
  })
};

export default Ember.Controller.extend({
  init() {
    this._super(...arguments);
    this.changeset = new Changeset(this, lookupValidator(PhoneValidation), PhoneValidation);
  },
  
  formattedPhoneNumber: computed('phoneNumber', function() {
    let number = this.get('phoneNumber');
    if (!number) {
      return false;
    }
    let formatted = number.replace(/[-\(\(\W\.]/g, '');
    if (formatted.slice(0, 1) !== '1') {
      return '1' + formatted;
    } else {
      return formatted;
    }
  }),
  
  actions: {
    lookup(zip) {
      fetch(`${config.API}/api/lookup?zip=${zip}`)
        .then(r => r.json())
        .then(j => this.set('legislators', j));
    },
    call(phone) {
      let my_number = this.get('myFormattedNumber');
      let dial_out = formatPhoneNumber(phone);
      fetch(`${config.API}/api/call?my_number=${my_number}&dial_out=${dial_out}`);
    }
  }
});
