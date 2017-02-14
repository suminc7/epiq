

import Vue from 'vue';
import numeral from 'numeral'

Vue.filter('number', (value) => {
	return value && numeral(value).format('0,0')
});