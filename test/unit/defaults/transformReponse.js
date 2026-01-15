import defaults from '../../../lib/defaults/index.js';
import transformData from '../../../lib/core/transformData.js';
import assert from 'assert';

describe('transformResponse', function () {
    describe('200 request', function () {
        it('parses json', function () {
<<<<<<< HEAD
            const data = '{"message": "hello, world"}';
            const result = transformData.call({
                data,
                response: {
                    headers: {'content-type': 'application/json'},
                    status: 200
                }
            }, defaults.transformResponse);
            assert.strictEqual(result.message, 'hello, world');
        });
        it('ignores XML', function () {
            const data = '<message>hello, world</message>';
            const result = transformData.call({
                data,
                response: {
                    headers: {'content-type': 'text/xml'},
                    status: 200
                }
            }, defaults.transformResponse);
=======
            var data = '{"message": "hello, world"}';
            var result = transformData(data, {'content-type': 'application/json'}, 200, defaults.transformResponse);
            assert.strictEqual(result.message, 'hello, world');
        });
        it('ignores XML', function () {
            var data = '<message>hello, world</message>';
            var result = transformData(data, {'content-type': 'text/xml'}, 200, defaults.transformResponse);
>>>>>>> upstream/main
            assert.strictEqual(result, data);
        });
    });
    describe('204 request', function () {
        it('does not parse the empty string', function () {
<<<<<<< HEAD
            const data = '';
            const result = transformData.call({
                data,
                response: {
                    headers: {'content-type': undefined},
                    status: 204
                }
            }, defaults.transformResponse);
            assert.strictEqual(result, '');
        });
        it('does not parse undefined', function () {
            const data = undefined;
            const result = transformData.call({
                data,
                response: {
                    headers: {'content-type': undefined},
                    status: 200
                }
            }, defaults.transformResponse);
=======
            var data = '';
            var result = transformData(data, {'content-type': undefined}, 204, defaults.transformResponse);
            assert.strictEqual(result, '');
        });
        it('does not parse undefined', function () {
            var data = undefined;
            var result = transformData(data, {'content-type': undefined}, 200, defaults.transformResponse);
>>>>>>> upstream/main
            assert.strictEqual(result, data);
        });
    });
});
