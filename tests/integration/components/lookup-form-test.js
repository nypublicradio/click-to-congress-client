import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('lookup-form', 'Integration | Component | lookup form', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{lookup-form}}`);

  assert.equal(this.$('.input-zipcode').length, 1, 'zip code input is rendered');
  assert.equal(this.$('.input-phonenumber').length, 1, 'phone number input is rendered');
});

test('it renders zip code validations', function(assert) {
  this.render(hbs`{{lookup-form}}`);
  this.$('.input-zipcode').val('1121g');
  this.$('.input-zipcode').trigger('change');
  
  assert.equal(this.$('.error').length, 1, 'should show an error message');
  assert.equal(this.$('.error').text(), 'Zip code must be all numbers');
  assert.ok(this.$('.input-zipcode').hasClass('is-errored'), 'should have errored class');
  assert.ok(this.$('.lookup-submit').is(':disabled'), 'submit is disabled if zip code is bad');
});

test('it renders phone number validations', function(assert) {
  const BAD_NUMBER = 'abcde';
  
  this.render(hbs`{{lookup-form}}`);
  this.$('.input-phonenumber').val(BAD_NUMBER);
  this.$('.input-phonenumber').trigger('change');
  
  assert.equal(this.$('.error').length, 1, 'should show an error message');
  assert.equal(this.$('.error').text(), `${BAD_NUMBER} is not a valid phone number`);
});

test('it calls the passed in lookup action when clicked', function(assert) {
  const ZIP = '123456';
  const PHONE = '5555555555';
  this.set('lookup', function(zip, phone) {
    assert.equal(zip, ZIP, 'passes zip');
    assert.equal(phone, PHONE, 'passes phone if present');
  });
  this.render(hbs`{{lookup-form lookup=(action lookup)}}`);
  this.$('.input-zipcode').val(ZIP);
  this.$('.input-zipcode').trigger('change');
  
  this.$('.input-phonenumber').val(PHONE);
  this.$('.input-phonenumber').trigger('change');
  
  this.$('.lookup-submit').click();
});
