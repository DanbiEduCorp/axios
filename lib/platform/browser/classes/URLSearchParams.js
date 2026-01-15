'use strict';

<<<<<<< HEAD
import AxiosURLSearchParams from '../../../helpers/AxiosURLSearchParams.js';
export default typeof URLSearchParams !== 'undefined' ? URLSearchParams : AxiosURLSearchParams;
=======
var AxiosURLSearchParams = require('../../../helpers/AxiosURLSearchParams');

module.exports = typeof URLSearchParams !== 'undefined' ? URLSearchParams : AxiosURLSearchParams;
>>>>>>> upstream/main
