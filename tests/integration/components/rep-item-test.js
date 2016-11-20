import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('rep-item', 'Integration | Component | rep item', {
  integration: true
});

test('it renders', function(assert) {
  this.set('rep', {
    firstName: 'foo',
    lastName: 'bar',
    party: 'baz',
    fullTitle: 'Senator',
    phone: '555-555-5555'
  });
  this.render(hbs`{{rep-item rep=rep}}`);

  assert.equal(this.$('h3').text(), 'Senator foo bar');
});

test('calls the passed in call action', function(assert) {
  assert.expect(2);
  this.set('rep', {phone: 'foo'});
  this.set('call', function(number) {
    assert.ok('call is called');
    assert.equal(number, 'foo', 'passes passed in phone number');
  });
  
  this.render(hbs`{{rep-item rep=rep call=(action call)}}`);
  
  this.$('.representative-callbutton').click();
});
