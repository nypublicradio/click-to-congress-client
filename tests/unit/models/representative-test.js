import { moduleForModel, test } from 'ember-qunit';

moduleForModel('representative', 'Unit | Model | representative', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('computes fullTitle', function(assert) {
  let model = this.subject({
    title: 'Sen'
  });
  
  assert.equal(model.get('fullTitle'), 'Senator', 'should be a senator');
});
