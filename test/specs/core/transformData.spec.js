import transformData from '../../../lib/core/transformData';

describe('core::transformData', function () {
  it('should support a single transformer', function () {
<<<<<<< HEAD
    let data;

    data = transformData.call({

    }, function (data) {
=======
    var data;
    data = transformData(data, null, null, function (data) {
>>>>>>> upstream/main
      data = 'foo';
      return data;
    })

    expect(data).toEqual('foo');
  });

  it('should support an array of transformers', function () {
<<<<<<< HEAD
    let data = '';
    data = transformData.call({data}, [function (data) {
=======
    var data = '';
    data = transformData(data, null, null, [function (data) {
>>>>>>> upstream/main
      data += 'f';
      return data;
    }, function (data) {
      data += 'o';
      return data;
    }, function (data) {
      data += 'o';
      return data;
    }]);

    expect(data).toEqual('foo');
  });

  it('should support reference headers in transformData', function () {
<<<<<<< HEAD
    const headers = {
      'content-type': 'foo/bar',
    };
    let data = '';
    data = transformData.call({data, headers}, [function (data, headers) {
=======
    var headers = {
      'content-type': 'foo/bar',
    };
    var data = '';
    data = transformData(data, headers, null, [function (data, headers) {
>>>>>>> upstream/main
      data += headers['content-type'];
      return data;
    }]);

    expect(data).toEqual('foo/bar');
  });

  it('should support reference status code in transformData', function () {
<<<<<<< HEAD
    let data = '';
    data = transformData.call({}, [function (data, headers, status) {
      data += status;
      return data;
    }], {data, status: 200});
=======
    var data = '';
    data = transformData(data, null, 200, [function (data, headers, status) {
      data += status;
      return data;
    }]);
>>>>>>> upstream/main

    expect(data).toEqual('200');
  });
});

