import DS from 'ember-data';
import service from 'ember-service/inject';

export default DS.Model.extend({
  i18n: service(),

  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  phone: DS.attr('string'),
  party: DS.attr('string'),
  title: DS.attr('string'),
  district: DS.attr('string'),
});
