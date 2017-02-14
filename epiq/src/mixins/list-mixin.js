import { mapGetters, mapActions } from 'vuex'

module.exports = {

	computed: {
		...mapGetters('comment',[
			'lists',
			'listTotalCount',
			'params'
		])
	},

	methods: {

		load(params){
			this.$store.dispatch(this.actionName, params)
		},
		changedOrder({ orderByField }) {
			this.load({...this.params, orderByField, offset: 0 });
		},
		listMore(offset){
			this.load({...this.params, offset});
		}
	},
	created() {
		this.load(this.params)
	}

};