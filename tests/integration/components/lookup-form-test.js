import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Changeset from 'ember-changeset';
import {
  validateFormat
} from 'ember-changeset-validations/validators';
import lookupValidator from 'ember-changeset-validations';

moduleForComponent('lookup-form', 'Integration | Component | lookup form', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{lookup-form}}`);

  assert.equal(this.$('.input-address').length, 1, 'zip code input is rendered');
  assert.equal(this.$('.input-phonenumber').length, 1, 'phone number input is rendered');
});

test('it renders zip code validations', function(assert) {
  this.render(hbs`{{lookup-form}}`);
  this.$('.input-address').val('');
  this.$('.input-address').trigger('change');
  
  assert.equal(this.$('.error').length, 1, 'should show an error message');
  assert.equal(this.$('.error').text(), 'Zip code must be all numbers');
  assert.ok(this.$('.input-address').hasClass('is-errored'), 'should have errored class');
  assert.ok(this.$('.lookup-submit').is(':disabled'), 'submit is disabled if zip code is bad');
});

test('it renders phone number validations', function(assert) {
  const BAD_NUMBER = 'abcde';
  const PhoneValidation = {
    phoneNumber: validateFormat({
      type: 'phone',
      message: (key, type, value) => `${value} is not a valid phone number`
    })
  };
  
  this.set('changeset', new Changeset({}, lookupValidator(PhoneValidation), PhoneValidation));
  this.render(hbs`{{lookup-form phoneChangeset=changeset}}`);
  this.$('.input-phonenumber').val(BAD_NUMBER);
  this.$('.input-phonenumber').trigger('change');
  
  assert.equal(this.$('.error').length, 1, 'should show an error message');
  assert.equal(this.$('.error').text(), `${BAD_NUMBER} is not a valid phone number`);
});

test('it calls the passed in lookup action when clicked', function(assert) {
  const ZIP = '123456';
  this.set('lookup', function(zip) {
    assert.equal(zip, ZIP, 'passes zip');
  });
  this.render(hbs`{{lookup-form lookup=(action lookup)}}`);
  this.$('.input-address').val(ZIP);
  this.$('.input-address').trigger('change');
  
  this.$('.lookup-submit').click();
});

test('it calls lookup without a phone number', function(assert) {
  const ZIP = '123456';
  this.set('lookup', function(zip) {
    assert.ok('called lookup');
    assert.equal(zip, ZIP, 'passes zip');
  });
  this.render(hbs`{{lookup-form lookup=(action lookup)}}`);
  this.$('.input-address').val(ZIP);
  this.$('.input-address').trigger('change');
  
  this.$('.lookup-submit').click();
});
