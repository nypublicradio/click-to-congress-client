import Ember from 'ember';
  
export default Ember.Component.extend({
  tagName: 'form',
  classNames: ['lookup-form'],
  error: {},
  
  submit() {
    this.send('getReps');
  },
  
  actions: {
    getReps() {
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
