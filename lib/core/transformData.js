'use strict';

import utils from './../utils.js';
import defaults from '../defaults/index.js';
import AxiosHeaders from '../core/AxiosHeaders.js';

/**
 * Transform the data for a request or a response
 *
<<<<<<< HEAD
=======
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Number} status HTTP status code
>>>>>>> upstream/main
 * @param {Array|Function} fns A single function or Array of functions
 * @param {?Object} response The response object
 *
 * @returns {*} The resulting transformed data
 */
<<<<<<< HEAD
export default function transformData(fns, response) {
  const config = this || defaults;
  const context = response || config;
  const headers = AxiosHeaders.from(context.headers);
  let data = context.data;

  utils.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
=======
module.exports = function transformData(data, headers, status, fns) {
  var context = this || defaults;
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers, status);
>>>>>>> upstream/main
  });

  headers.normalize();

  return data;
}
