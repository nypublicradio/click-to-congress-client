import Ember from 'ember';
import Modernizr from 'modernizr';

export default Ember.Component.extend({
  classNames: ['representative'],
  
  init() {
    this._super(...arguments);
    this.set('isTouch', Modernizr.touchevents);
  },

  actions: {
    callRep(number) {
      this.get('call')(number);
    }
  }
});
