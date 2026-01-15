'use strict';

<<<<<<< HEAD
import utils from '../utils.js';

/**
 * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
 *
 * @param {string} name - The name of the property to get.
 *
 * @returns An array of strings.
 */
=======
var utils = require('../utils');

>>>>>>> upstream/main
function parsePropPath(name) {
  // foo[x][y][z]
  // foo.x.y.z
  // foo-x-y-z
  // foo x y z
<<<<<<< HEAD
  return utils.matchAll(/\w+|\[(\w*)]/g, name).map(match => {
=======
  return utils.matchAll(/\w+|\[(\w*)]/g, name).map(function(match) {
>>>>>>> upstream/main
    return match[0] === '[]' ? '' : match[1] || match[0];
  });
}

<<<<<<< HEAD
/**
 * Convert an array to an object.
 *
 * @param {Array<any>} arr - The array to convert to an object.
 *
 * @returns An object with the same keys and values as the array.
 */
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
=======
function arrayToObject(arr) {
  var obj = {};
  var keys = Object.keys(arr);
  var i;
  var len = keys.length;
  var key;
>>>>>>> upstream/main
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}

<<<<<<< HEAD
/**
 * It takes a FormData object and returns a JavaScript object
 *
 * @param {string} formData The FormData object to convert to JSON.
 *
 * @returns {Object<string, any> | null} The converted object.
 */
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];
    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && utils.isArray(target) ? target.length : name;

    if (isLast) {
      if (utils.hasOwnProp(target, name)) {
=======
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    var name = path[index++];
    var isNumericKey = Number.isFinite(+name);
    var isLast = index >= path.length;
    name = !name && utils.isArray(target) ? target.length : name;

    if (isLast) {
      if (utils.hasOwnProperty(target, name)) {
>>>>>>> upstream/main
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }

      return !isNumericKey;
    }

    if (!target[name] || !utils.isObject(target[name])) {
      target[name] = [];
    }

<<<<<<< HEAD
    const result = buildPath(path, value, target[name], index);
=======
    var result = buildPath(path, value, target[name], index);
>>>>>>> upstream/main

    if (result && utils.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }

    return !isNumericKey;
  }

  if (utils.isFormData(formData) && utils.isFunction(formData.entries)) {
<<<<<<< HEAD
    const obj = {};

    utils.forEachEntry(formData, (name, value) => {
=======
    var obj = {};

    utils.forEachEntry(formData, function(name, value) {
>>>>>>> upstream/main
      buildPath(parsePropPath(name), value, obj, 0);
    });

    return obj;
  }

  return null;
}

<<<<<<< HEAD
export default formDataToJSON;
=======
module.exports = formDataToJSON;
>>>>>>> upstream/main
