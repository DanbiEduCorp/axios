<<<<<<< HEAD
import {kindOfTest} from '../../../lib/utils';

describe('utils::endsWith', function () {
  it('should return true if the string ends with passed substring', function () {
    const test = kindOfTest('number');
=======
var kindOfTest = require('../../../lib/utils').kindOfTest;

describe('utils::endsWith', function () {
  it('should return true if the string ends with passed substring', function () {
    var test = kindOfTest('number');
>>>>>>> upstream/main

    expect(test(123)).toEqual(true);
    expect(test('123')).toEqual(false);
  });
});
