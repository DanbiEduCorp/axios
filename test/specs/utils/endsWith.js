<<<<<<< HEAD
import utils from '../../../lib/utils';

const {kindOf} = utils;
=======
var kindOf = require('../../../lib/utils').kindOf;
>>>>>>> upstream/main

describe('utils::kindOf', function () {
  it('should return object tag', function () {
    expect(kindOf({})).toEqual('object');
    // cached result
    expect(kindOf({})).toEqual('object');
    expect(kindOf([])).toEqual('array');
  });
});
