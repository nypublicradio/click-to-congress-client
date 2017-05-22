import Ember from 'ember';

export function repTitle([office]/*, hash*/) {
  if (office === 'United States Senate') {
    return 'Senator';
  } else if (office.match('House of Representatives')) {
    return 'Representative';
  } else if (office.match('State Senate')) {
    return 'State Senator';
  } else if (office.match('State Assembly|State House')) {
    return 'Assembly Member';
  } else if (office.match('Borough President')) {
    return 'Borough President';
  } else {
    return office;
  }
}

export default Ember.Helper.helper(repTitle);
