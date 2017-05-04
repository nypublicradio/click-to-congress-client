import { test } from 'qunit';
import moduleForAcceptance from 'clicktocongress-ember/tests/helpers/module-for-acceptance';
import config from '../../config/environment';

moduleForAcceptance('Acceptance | index');

test('visiting /', function(assert) {
  const PHONE = '5555555555';
  server.get(`${config.API}/api/call`, function(schema, request) {
    assert.equal(request.queryParams.my_number, '1' + PHONE);
  });
  
  visit('/');

  fillIn('.input-address', '155 Main street');
  click('.lookup-submit');
  
  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.ok(find('.representative').length, 3, 'two senators and a rep');
  });
  
  fillIn('.input-phonenumber', PHONE);
  andThen(function() {
    find('.representative')
      .first().find('.representative-callbutton').click();
  });
});
