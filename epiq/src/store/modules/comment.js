import _ from 'lodash'
import comment from '../../api/comment'
import { getTimeago } from '../../utils/Date'
import * as types from '../mutation-types'
import * as orderTypes from '../../store/order-types'
import * as commentTypes from '../../store/comment-types'
import StringUtils from '../../utils/String'

// initial state
const state = {
	lists: [],
	listTotalCount: 0,
	editId: null,
	params: {
		offset: 0,
		size: 5,
		contentId: StringUtils.getURLParameter('contentId'),
		isSearchTotalCnt: 'Y',
		orderByField: orderTypes.RECENTLY
	}
}

// getters
const getters = {
	contentId: state => state.contentId,
	lists: state => state.lists,
	listTotalCount: state => state.listTotalCount,
	params: state => state.params,
	editId: state => state.editId
}

// actions
const actions = {

	newComment({ commit, state }, message) {

		comment.newComment({
			contentId: state.params.contentId,
			comment: StringUtils.replaceComment(message),
			status: commentTypes.NORMAL
		}).then(result => {
			commit(types.NEW_COMMENT, { result })
		})
	},

	fetchCommentLists({ commit }, params) {
		comment.fetchCommentLists(params).then(result => {
			commit(types.FETCH_COMMENT_LISTS, { result, params })
			commit(types.EDIT_COMMENT, { id: 0 })
		});
	},
	editComment({ commit }, { id }) {
		commit(types.EDIT_COMMENT, { id })
	},
	cancelComment({ commit }) {
		commit(types.EDIT_COMMENT, { id: 0 })
	},
	expandComment({ commit }, {id, expand}) {
		commit(types.EXPAND_COMMENT, { id, expand })
	},
	toggleExpandComment({ commit }, id) {
		commit(types.TOGGLE_EXPAND_COMMENT, { id })
	},
	deleteComment({ commit }, { id, status }) {
		comment.deleteComment({ id, status }).then(() => {
			commit(types.DELETE_COMMENT, { id })
		});
	},
	modifyComment({ commit }, { id, message }) {
		comment.modifyComment({
			id,
			comment: StringUtils.replaceComment(message)
		}).then(result => {
			commit(types.MODIFY_COMMENT, { id, result })
			commit(types.EDIT_COMMENT, { id: 0 })
		});
	},
	likeComment({ commit }, { id, likeType, currentOpinionType, commentType }){
		comment.likeComment({ id, likeType, currentOpinionType, commentType }).then(() => {
			commit(types.LIKE_COMMENT, { id, likeType, currentOpinionType })
		});
	}
}

// mutations
const mutations = {
	[types.NEW_COMMENT] (state, { result }) {
		const lists = _.map(result.data.comments, listMap)
		state.listTotalCount++;
		state.lists.unshift(...lists);
	},
	[types.FETCH_COMMENT_LISTS] (state, { result, params }) {
		params.orderByField !== state.params.orderByField && (state.lists = [])
		const lists = _.map(result.data.comments, listMap)
		state.listTotalCount = result.data.totalCommentCount;
		state.lists.push(...lists);
		state.params = params;
	},
	[types.EDIT_COMMENT] (state, { id }) {
		state.editId = id;
	},
	[types.DELETE_COMMENT] (state, { id }) {
		state.lists = _.reject(state.lists, {id});
	},
	[types.MODIFY_COMMENT] (state, { id, result }) {
		const list = _.find(state.lists, {id});
		list.comment = result.data.comments[0].comment;
		list.expand = false;
	},
	[types.EXPAND_COMMENT] (state, { id, expand }) {
		_.find(state.lists, {id}).expand = expand;
	},
	[types.TOGGLE_EXPAND_COMMENT] (state, { id }) {
		const list = _.find(state.lists, {id});
		list.expanded = !list.expanded;
	},
	[types.LIKE_COMMENT] (state, { id, likeType, currentOpinionType }) {
		const list = _.find(state.lists, {id});
		list.opinion = likeType;

//		if(likeType === commentTypes.LIKE){
//			list.likeCount++;
//			list.likeCount = list.likeCount+1000;
//		}
//		if(likeType === commentTypes.DISLIKE){
//			list.dislikeCount++;
//			list.dislikeCount = list.dislikeCount+1000;
//		}
//		return;

		if(likeType === commentTypes.LIKE){
			list.likeCount++;
			if(currentOpinionType === commentTypes.DISLIKE){
				list.dislikeCount--;
			}
		}

		if(likeType === commentTypes.DISLIKE){
			list.dislikeCount++;
			if(currentOpinionType === commentTypes.LIKE){
				list.likeCount--;
			}
		}

		if(likeType === commentTypes.INDIFFERENT){
			if(currentOpinionType === commentTypes.LIKE){
				list.likeCount--;
			}else if(currentOpinionType === commentTypes.DISLIKE){
				list.dislikeCount--;
			}
		}

	}
}

function listMap(list) {
	return {
		...list,
		dateCreated: getTimeago(list.dateCreated),
		isBest: list.isBest === 'Y',
		creator: list.myCommentYn === 'Y',
		opinion: list.myOpinion,
		deleted: list.status === commentTypes.USER_DELETE,
		expand: false,
		expanded: false
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
