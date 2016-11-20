import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['representative'],
  
  actions: {
    callRep(number) {
      this.get('call')(number);
    }
  }
});
