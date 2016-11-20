import Ember from 'ember';
import Changeset from 'ember-changeset';
import LookupValidations from '../validations/lookup-form';
import lookupValidator from 'ember-changeset-validations';

export default Ember.Component.extend({
  classNames: ['lookup-form'],

  init() {
    this._super(...arguments);
    this.changeset = new Changeset(this, lookupValidator(LookupValidations), LookupValidations);
  },
  
  actions: {
    getReps() {
      if (this.changeset.get('isValid')) {
        this.changeset.save();
      }
      this.get('lookup')(this.get('zipCode'), this.get('phoneNumber'));
    }
  }
});
