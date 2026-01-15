<<<<<<< HEAD
import toFormData from '../../../lib/helpers/toFormData';

describe('toFormData', function () {
  it('should convert nested data object to FormData with dots option enabled', function () {
    const o = {
=======
var toFormData = require('../../../lib/helpers/toFormData');

describe('toFormData', function () {
  it('should convert nested data object to FormData with dots option enabled', function () {
    var o = {
>>>>>>> upstream/main
      val: 123,
      nested: {
        arr: ['hello', 'world']
      }
    };

<<<<<<< HEAD
    const form = toFormData(o, null, {dots: true});
=======
    var form = toFormData(o, null, {dots: true});
>>>>>>> upstream/main
    expect(form instanceof FormData).toEqual(true);
    expect(Array.from(form.keys()).length).toEqual(3);
    expect(form.get('val')).toEqual('123');
    expect(form.get('nested.arr.0')).toEqual('hello');
  });

  it('should respect metaTokens option', function () {
<<<<<<< HEAD
    const data = {
      'obj{}': {x: 1, y: 2}
    };

    const str = JSON.stringify(data['obj{}']);

    const form = toFormData(data, null, {metaTokens: false});
=======
    var data = {
      'obj{}': {x: 1, y: 2}
    };

    var str = JSON.stringify(data['obj{}']);

    var form = toFormData(data, null, {metaTokens: false});
>>>>>>> upstream/main

    expect(Array.from(form.keys()).length).toEqual(1);
    expect(form.getAll('obj')).toEqual([str]);
  });

  describe('Flat arrays serialization', function () {
    it('should include full indexes when the `indexes` option is set to true', function () {
<<<<<<< HEAD
      const data = {
=======
      var data = {
>>>>>>> upstream/main
        arr: [1, 2, 3],
        arr2: [1, [2], 3]
      };

<<<<<<< HEAD
      const form = toFormData(data, null, {indexes: true});
=======
      var form = toFormData(data, null, {indexes: true});
>>>>>>> upstream/main

      expect(Array.from(form.keys()).length).toEqual(6);

      expect(form.get('arr[0]')).toEqual('1');
      expect(form.get('arr[1]')).toEqual('2');
      expect(form.get('arr[2]')).toEqual('3');

      expect(form.get('arr2[0]')).toEqual('1');
      expect(form.get('arr2[1][0]')).toEqual('2');
      expect(form.get('arr2[2]')).toEqual('3');
    });

    it('should include brackets only when the `indexes` option is set to false', function () {
<<<<<<< HEAD
      const data = {
=======
      var data = {
>>>>>>> upstream/main
        arr: [1, 2, 3],
        arr2: [1, [2], 3]
      };

<<<<<<< HEAD
      const form = toFormData(data, null, {indexes: false});
=======
      var form = toFormData(data, null, {indexes: false});
>>>>>>> upstream/main

      expect(Array.from(form.keys()).length).toEqual(6);

      expect(form.getAll('arr[]')).toEqual(['1', '2', '3']);

      expect(form.get('arr2[0]')).toEqual('1');
      expect(form.get('arr2[1][0]')).toEqual('2');
      expect(form.get('arr2[2]')).toEqual('3');
    });

    it('should omit brackets when the `indexes` option is set to null', function () {
<<<<<<< HEAD
      const data = {
=======
      var data = {
>>>>>>> upstream/main
        arr: [1, 2, 3],
        arr2: [1, [2], 3]
      };

<<<<<<< HEAD
      const form = toFormData(data, null, {indexes: null});
=======
      var form = toFormData(data, null, {indexes: null});
>>>>>>> upstream/main

      expect(Array.from(form.keys()).length).toEqual(6);

      expect(form.getAll('arr')).toEqual(['1', '2', '3']);

      expect(form.get('arr2[0]')).toEqual('1');
      expect(form.get('arr2[1][0]')).toEqual('2');
      expect(form.get('arr2[2]')).toEqual('3');
    });
  });

  it('should convert nested data object to FormData', function () {
<<<<<<< HEAD
    const o = {
=======
    var o = {
>>>>>>> upstream/main
      val: 123,
      nested: {
        arr: ['hello', 'world']
      }
    };

<<<<<<< HEAD
    const form = toFormData(o);
=======
    var form = toFormData(o);
>>>>>>> upstream/main
    expect(form instanceof FormData).toEqual(true);
    expect(Array.from(form.keys()).length).toEqual(3);
    expect(form.get('val')).toEqual('123');
    expect(form.get('nested[arr][0]')).toEqual('hello');
  });

  it('should append value whose key ends with [] as separate values with the same key', function () {
<<<<<<< HEAD
    const data = {
      'arr[]': [1, 2, 3]
    };

    const form = toFormData(data);
=======
    var data = {
      'arr[]': [1, 2, 3]
    };

    var form = toFormData(data);
>>>>>>> upstream/main

    expect(Array.from(form.keys()).length).toEqual(3);
    expect(form.getAll('arr[]')).toEqual(['1', '2', '3']);
  });

  it('should append value whose key ends with {} as a JSON string', function () {
<<<<<<< HEAD
    const data = {
      'obj{}': {x: 1, y: 2}
    };

    const str = JSON.stringify(data['obj{}']);

    const form = toFormData(data);
=======
    var data = {
      'obj{}': {x: 1, y: 2}
    };

    var str = JSON.stringify(data['obj{}']);

    var form = toFormData(data);
>>>>>>> upstream/main

    expect(Array.from(form.keys()).length).toEqual(1);
    expect(form.getAll('obj{}')).toEqual([str]);
  });
});

