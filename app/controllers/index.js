import Controller from 'ember-controller';
import fetch from 'fetch';
import config from '../config/environment';
import computed from 'ember-computed';
import Changeset from 'ember-changeset';
import {
  validateFormat
} from 'ember-changeset-validations/validators';
import lookupValidator from 'ember-changeset-validations';

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
  
  congress: computed('model', function() {
    let congressPerson = this.get('model').findBy('title', 'Representative');
    if (congressPerson) {
      return congressPerson.get('district');
    }
  }),
  
  stateSenate: computed('model', function() {
    let stateSenator = this.get('model').findBy('title', 'State Senator');
    if (stateSenator) {
      return stateSenator.get('district');
    }
  }),
  
  stateAssembly: computed('model', function() {
    let stateAssemblor = this.get('model').findBy('title', 'Assembly Member');
    if (stateAssemblor) {
      return stateAssemblor.get('district');
    }
  }),
  
  actions: {
    lookup(address) {
      this.store.query('representative', {address})
        .then(r => this.set('model', r));
    },
    call(phone) {
      if (this.changeset.get('isValid')) {
        this.changeset.save();
      }
      let number = formatPhoneNumber(phone);
      fetch(`${config.API}/${config.API_NAMESPACE}/v1/call?my_number=${this.get('formattedPhoneNumber')}&dial_out=${number}`);
    }
  }
});
