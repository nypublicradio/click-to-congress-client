import Ember from 'ember';
import fetch from 'fetch';
import config from '../config/environment';
import set from 'ember-metal/set';

const API = config.environment === 'development' ? 'http://localhost:4000' : null;

export default Ember.Controller.extend({
  selectedLegislator: Ember.computed('legislators.@each.selected', function() {
    let legislators = this.get('legislators');
    return legislators.findBy('selected');
  }),
  
  actions: {
    select(legislator) {
      this.get('legislators')
        .forEach(l => set(l, 'selected', false));
      set(legislator, 'selected', true);
    },
    lookup(zip) {
      fetch(`${API}/api/lookup?zip=${zip}`)
        .then(r => r.json())
        .then(j => this.set('legislators', j));
    },
    call(phone) {
      fetch(`${API}/api/call?my_number=${this.get('phone')}&dial_out=${phone}`);
    }
  }
});
