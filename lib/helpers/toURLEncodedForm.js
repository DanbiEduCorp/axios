'use strict';

<<<<<<< HEAD
import utils from '../utils.js';
import toFormData from './toFormData.js';
import platform from '../platform/index.js';

export default function toURLEncodedForm(data, options) {
=======
var utils = require('../utils');
var toFormData = require('./toFormData');
var platform = require('../platform/');

module.exports = function toURLEncodedForm(data, options) {
>>>>>>> upstream/main
  return toFormData(data, new platform.classes.URLSearchParams(), Object.assign({
    visitor: function(value, key, path, helpers) {
      if (platform.isNode && utils.isBuffer(value)) {
        this.append(key, value.toString('base64'));
        return false;
      }

      return helpers.defaultVisitor.apply(this, arguments);
    }
  }, options));
<<<<<<< HEAD
}
=======
};
>>>>>>> upstream/main
