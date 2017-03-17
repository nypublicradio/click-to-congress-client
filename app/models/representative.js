import DS from 'ember-data';
import service from 'ember-service/inject';
import computed from 'ember-computed';
import ordinalize from '../utils/ordinalize';

export default DS.Model.extend({
  i18n: service(),

  name: DS.attr('string'),
  phone: DS.attr('string'),
  party: DS.attr('string'),
  office: DS.attr('string'),
  title: computed('office', function() {
    let office = this.get('office');
    if (office === 'United States Senate') {
      return 'Senator';
    } else if (office.match('House of Representatives')) {
      return 'Representative';
    } else if (office.match('State Senate')) {
      return 'State Senator';
    } else if (office.match('State Assembly')) {
      return 'Assembly Member';
    } else if (office.match('Borough President')) {
      return 'Borough President';
    } else {
      return office;
    }
  }),
  district: computed('divisionId', function() {
    let districtCode = this.get('divisionId').split('/')[3];
    if (districtCode) {
      let district = districtCode.split(':')[1];
      
      if (!isNaN(Number(district))) { // a real number
        return ordinalize(district);
      }
    }
  })
});
