
const obj = {};

obj.install = function (Vue, options) {



	Vue.prototype.$t = function (key) {
		return $.i18n.prop(key)
	}

}

module.exports = obj;