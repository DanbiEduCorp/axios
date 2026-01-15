<<<<<<< HEAD
import URLSearchParams from './classes/URLSearchParams.js'
import FormData from './classes/FormData.js'

export default {
  isNode: true,
  classes: {
    URLSearchParams,
    FormData,
=======
'use strict';

module.exports = {
  isNode: true,
  classes: {
    URLSearchParams: require('./classes/URLSearchParams'),
    FormData: require('./classes/FormData'),
>>>>>>> upstream/main
    Blob: typeof Blob !== 'undefined' && Blob || null
  },
  protocols: [ 'http', 'https', 'file', 'data' ]
};
