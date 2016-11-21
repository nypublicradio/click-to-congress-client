import Ember from 'ember';
import Changeset from 'ember-changeset';
import {
  validateLength,
  validateFormat
} from 'ember-changeset-validations/validators';
import lookupValidator from 'ember-changeset-validations';
  
const ZipValidation = {
  zipCode: [
    validateFormat({ regex: /^\d*$/, message: '{description} must be all numbers'}),
    validateLength({ min: 1, max: 6})
  ]
};

export default Ember.Component.extend({
  classNames: ['lookup-form'],

  init() {
    this._super(...arguments);
    this.changeset = new Changeset(this, lookupValidator(ZipValidation), ZipValidation);
  },
  
  actions: {
    getReps() {
      if (this.changeset.get('isValid')) {
        this.changeset.save();
      }
      this.get('lookup')(this.get('zipCode'));
    },
  }
});
