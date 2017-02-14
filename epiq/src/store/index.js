import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import home from './modules/home'
import comment from './modules/comment'
import list from './modules/list'
import popup from './modules/popup'


Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	actions,
	getters,
	modules: {
		home,
		comment,
		list,
		popup
	},
	strict: debug,
	plugins: []
})