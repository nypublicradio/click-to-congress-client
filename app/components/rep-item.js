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
      this.set('isDialing', true);
      this.get('call')(number);
      // TODO get status from server
      Ember.run.later(this, () => this.set('isDialing', false), 10 * 1000);
    }
  }
});
