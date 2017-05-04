import Ember from 'ember';
  
export default Ember.Component.extend({
  classNames: ['lookup-form'],

  init() {
    this._super(...arguments);
    // this.changeset = new Changeset(this, lookupValidator(ZipValidation), ZipValidation);
  },
  
  submit() {
    this.send('getReps');
  },
  
  actions: {
    getReps() {
      // if (this.changeset.get('isValid')) {
      //   this.changeset.save();
      // }
      this.get('lookup')(this.get('address'));
    },
  }
});
