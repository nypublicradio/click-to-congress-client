import DS from 'ember-data';
import config from '../config/environment';

export default DS.RESTAdapter.extend({
  host: config.API,
  namespace: 'api',
  pathForType: () => 'lookup'
});
