import DS from 'ember-data';
import config from '../config/environment';

export default DS.RESTAdapter.extend({
  host: config.API,
  namespace:`${config.API_NAMESPACE}/v1`,
  pathForType: () => 'lookup'
});
