import { faker } from 'ember-cli-mirage';

function makeReps() {
  let rep1 = {
    title: "Sen",
    phone: faker.phone.phoneNumber('###-###-####'),
    party: faker.random.arrayElement(['D', 'R']),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    district: null,
    bioguide_id: faker.random.number(10)
  };
  let rep2 = {
    title: "Sen",
    phone: faker.phone.phoneNumber('###-###-####'),
    party: faker.random.arrayElement(['D', 'R']),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    district: null,
    bioguide_id: faker.random.number(10)
  };
  let rep3 = {
    title: "Rep",
    phone: faker.phone.phoneNumber('###-###-####'),
    party: faker.random.arrayElement(['D', 'R']),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    district: faker.random.number(200),
    bioguide_id: faker.random.number(10)
  };
  return [rep1, rep2, rep3];
}

export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  this.urlPrefix = 'http://localhost:4000';    // make this `http://localhost:8080`, for example, if your API is on a different server
  this.namespace = 'api';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing
  
  this.get('/lookup', function() {
    return makeReps();
  });

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.2.x/shorthands/
  */
}
