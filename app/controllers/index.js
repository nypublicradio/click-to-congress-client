import Ember from 'ember';
import fetch from 'fetch';
import config from '../config/environment';
import set from 'ember-metal/set';

function formatPhoneNumber(number) {
  let formatted = number.replace(/-/g, '');
  if (!formatted.startsWith('1')) {
    return '1' + formatted;
  } else {
    return formatted;
  }
  
}

export default Ember.Controller.extend({
  selectedLegislator: Ember.computed('legislators.@each.selected', function() {
    let legislators = this.get('legislators');
    return legislators.findBy('selected');
  }),
  myFormattedNumber: Ember.computed('phone', function() {
    return formatPhoneNumber(this.get('phone'));
  }),
  
  actions: {
    select(legislator) {
      this.get('legislators')
        .forEach(l => set(l, 'selected', false));
      set(legislator, 'selected', true);
    },
    lookup(zip) {
      fetch(`${config.API}/api/lookup?zip=${zip}`)
        .then(r => r.json())
        .then(j => this.set('legislators', j));
    },
    call(phone) {
      let my_number = this.get('myFormattedNumber');
      let dial_out = formatPhoneNumber(phone);
      fetch(`${config.API}/api/call?my_number=${my_number}&dial_out=${dial_out}`);
    }
  }
});
