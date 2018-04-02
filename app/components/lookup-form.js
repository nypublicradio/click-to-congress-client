import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'form',
  classNames: ['lookup-form'],
  error: {},

  serverErrorMessage: Ember.computed('serverError', function() {
    let serverError = this.get('serverError');
    if (!serverError) {
      return;
    }
    if (serverError.message === "Failed to parse address") {
      return 'Did not recognize address. Try adding more details like city, state, or ZIP code.';
    } else {
      return serverError.message;
    }
  }),

  submit() {
    this.send('getReps');
  },

  actions: {
    getReps() {
      this.set('serverError', null);
      if (!this.get('address')) {
        this.set('error.address', 'Address required');
        return;
      } else {
        this.set('error.address', null);
      }
      this.get('lookup')(this.get('address'));
    },
  }
});
