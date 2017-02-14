import Vue from 'vue'
import qs from 'qs'

export default {
	fetchCommentReportList () {
		return Vue.axios.request({
			method: 'GET',
			url: `/comment/report/menu_list`
		})
	},
	submitCommentReport(params){
		return Vue.axios.request({
			method: 'POST',
			url: `/comment/report`,
			data: qs.stringify(params),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
	}
}