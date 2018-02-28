/* jshint node: true */

module.exports = function(environment) {
  var deployTarget = process.env.DEPLOY_TARGET;
  var ENV = {
    API: process.env.API || '/api',
    API_NAMESPACE: process.env.API_NAMESPACE || '',
    modulePrefix: 'clicktocongress-ember',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    i18n: {
      defaultLocale: 'en'
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV['ember-cli-mirage'] = {
      enabled: process.env.MIRAGE_ENABLED === true
    }
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.API = 'https://clicktocongress.herokuapp.com';
  }

  if (deployTarget === 'demo') {
    ENV.API = 'https://api.demo.nypr.digital';
    ENV.API_NAMESPACE = 'click-to-congress'
    ENV.rootURL = '/click-to-congress/';
  }

  return ENV;
};
