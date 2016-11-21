import Controller from 'ember-controller';
import fetch from 'fetch';
import config from '../config/environment';
import computed from 'ember-computed';
import Changeset from 'ember-changeset';
import {
  validateFormat
} from 'ember-changeset-validations/validators';
import lookupValidator from 'ember-changeset-validations';
import ordinalize from '../utils/ordinalize';

const PhoneValidation = {
  phoneNumber: validateFormat({
    type: 'phone',
    message: (key, type, value) => `${value} is not a valid phone number`
  })
};

export default Controller.extend({
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
  district: computed('model', function() {
    let district = this.get('model').findBy('district').get('district');
    return ordinalize(district);
  }),
  
  actions: {
    lookup(zip) {
      this.store.query('representative', {zip})
        .then(r => this.set('model', r))
        .then(() => this.set('zip', zip));
    },
    call(phone) {
      if (this.changeset.get('isValid')) {
        this.changeset.save();
      }
      fetch(`${config.API}/api/call?my_number=${this.get('formattedPhoneNumber')}&dial_out=${phone}`);
    }
  }
});
