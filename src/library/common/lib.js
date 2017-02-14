if(!global._babelPolyfill){
    require('babel-polyfill');
}


/**
 * jquery
 */
import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;

import 'jquery.browser';
import 'jquery.scrollbar';
import 'selectize';
require('./jquery.i18n.properties');


import 'gsap';
import './modernizr-custom';

import moment from 'moment';
import 'moment/locale/ko';
window.moment = moment;

import crypto from 'crypto-js';
window.CryptoJS = crypto;