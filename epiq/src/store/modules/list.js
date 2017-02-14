import _ from 'lodash'
import comment from '../../api/comment'
import { getTimeago } from '../../utils/Date'
import * as types from '../mutation-types'
import * as orderTypes from '../../store/order-types'

// initial state
const state = {
	items: [],
	itemTotal: 0,
	params: {
		offset: 0,
		size: 16,
		isSearchTotalCnt: 'Y',
		orderByField: orderTypes.RECENTLY
	}
}

// getters
const getters = {

}

// actions
const actions = {

	setOrder({ commit, dispatch }, obj){
		commit(types.SET_ORDER_TYPE, obj)
	}
}

// mutations
const mutations = {

	[types.SET_ORDER_TYPE] (state, { order }) {
		state.params.orderByField = order;
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
