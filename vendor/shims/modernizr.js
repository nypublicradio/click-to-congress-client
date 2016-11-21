(function() {
  function vendorModule() {
    'use strict';

    return { 'default': self['Modernizr'] };
  }

  define('modernizr', [], vendorModule);
})();
