import DS from 'ember-data';
import computed from 'ember-computed';

export default DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  phone: DS.attr('phone'),
  party: DS.attr('string'),
  title: DS.attr('string'),
  district: DS.attr('string'),
  
  fullTitle: computed('title', function() {
    let title = this.get('title');
    
    switch(title) {
      case 'Sen':
        return 'Senator';
      case 'Rep':
        return 'Republican';
      case 'Del':
        return 'Delegate';
      case 'Com':
        return 'Com';
      default:
        return 'no title';
    }
  })
});
