import Ember from 'ember';

export default Ember.Component.extend({
  i18n: Ember.inject.service(),
  classNames: ['language-select'],

  locales: Ember.computed('i18n.locale', 'i18n.locales', function() {
    return ['en', 'es', 'fr', 'cn'].map(loc => {
      return { id: loc, text: this.get('i18n').t('language-select.language.' + loc) };
    });
  }),
});
