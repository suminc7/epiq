import _ from 'lodash'
import popup from '../../api/popup'
import * as popupTypes from '../../store/popup-types'

// initial state
const state = {
	type: null,

	commentReport: {
		lists: [],
	}
}

// getters
const getters = {
	type: state => state.type,
	commentReport: state => state.commentReport
}

// actions
const actions = {

	openCommentReport({ commit }, { commentId, commentType }){
		popup.fetchCommentReportList({ commit }).then(result => {
			commit(popupTypes.COMMENT_REPORT, { result, commentId, commentType })
		});
	},
	closePopup({ commit }){
		commit(popupTypes.CLOSE_POPUP)
	},
	submitCommentReport({ commit }, commentReportReasonId){
		const { commentId, commentType } = state.commentReport;
		return popup.submitCommentReport({ commentId, commentType, commentReportReasonId }).then(() => {
			commit(popupTypes.SUBMIT_COMMENT_REPORT)
		});
	}


}

// mutations
const mutations = {

	[popupTypes.COMMENT_REPORT] (state, { result, commentId, commentType }) {

		state.type = popupTypes.COMMENT_REPORT;
		state.commentReport.lists = _.map(result.data.results, list => {
			return {
				id: list.id,
				ko: list.reportReason,
				en: list.enReportReason,
				zh: list.zhreportReason
			}
		});
		state.commentReport = { ...state.commentReport, commentId, commentType }

	},
	[popupTypes.SUBMIT_COMMENT_REPORT] (state) {
		state.type = popupTypes.SUBMIT_COMMENT_REPORT;
	},
	[popupTypes.CLOSE_POPUP] (state) {
		state.type = null;
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
