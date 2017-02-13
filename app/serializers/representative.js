import DS from 'ember-data';
import Ember from 'ember';

export default DS.JSONSerializer.extend({
  keyForAttribute(attr) { return Ember.String.underscore(attr); },
  primaryKey: 'bioguide_id',
//  normalizeQueryResponse(store, primaryModelClass, { results }, id, requestType) {
//    return this._super(store, primaryModelClass, results, id, requestType);
//  }
});
