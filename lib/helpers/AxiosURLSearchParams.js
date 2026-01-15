'use strict';

<<<<<<< HEAD
import toFormData from './toFormData.js';

/**
 * It encodes a string by replacing all characters that are not in the unreserved set with
 * their percent-encoded equivalents
 *
 * @param {string} str - The string to encode.
 *
 * @returns {string} The encoded string.
 */
function encode(str) {
  const charMap = {
=======
var toFormData = require('./toFormData');

function encode(str) {
  var charMap = {
>>>>>>> upstream/main
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+',
    '%00': '\x00'
  };
<<<<<<< HEAD
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
=======
  return encodeURIComponent(str).replace(/[!'\(\)~]|%20|%00/g, function replacer(match) {
>>>>>>> upstream/main
    return charMap[match];
  });
}

<<<<<<< HEAD
/**
 * It takes a params object and converts it to a FormData object
 *
 * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
 * @param {Object<string, any>} options - The options object passed to the Axios constructor.
 *
 * @returns {void}
 */
=======
>>>>>>> upstream/main
function AxiosURLSearchParams(params, options) {
  this._pairs = [];

  params && toFormData(params, this, options);
}

<<<<<<< HEAD
const prototype = AxiosURLSearchParams.prototype;
=======
var prototype = AxiosURLSearchParams.prototype;
>>>>>>> upstream/main

prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};

prototype.toString = function toString(encoder) {
<<<<<<< HEAD
  const _encode = encoder ? function(value) {
=======
  var _encode = encoder ? function(value) {
>>>>>>> upstream/main
    return encoder.call(this, value, encode);
  } : encode;

  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + '=' + _encode(pair[1]);
  }, '').join('&');
};

<<<<<<< HEAD
export default AxiosURLSearchParams;
=======
module.exports = AxiosURLSearchParams;
>>>>>>> upstream/main
