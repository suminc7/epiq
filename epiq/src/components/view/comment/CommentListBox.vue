<template>
    <list-box listType="comment" :state="state" expect="TITLE" loadListName="comment/fetchCommentLists">
        <ul class="comment-list-box">
            <template v-for="list in state.lists">
                <comment-input v-if="state.editId === list.id" :list="list"></comment-input>
                <comment-list v-else :list="list" :key="list.id"></comment-list>
            </template>
        </ul>
    </list-box>
</template>
<style lang="scss">
</style>
<script lang="babel">
	import ListBox from '../../common/list/ListBox.vue'
	import CommentList from './CommentList.vue'
	import CommentInput from './CommentInput.vue'
    import ListMixin from '../../../mixins/list-mixin'
	import * as orderTypes from '../../../store/order-types'
	import { mapGetters, mapActions, mapState } from 'vuex'

    export default {
    	components: {
			ListBox,
			CommentList,
			CommentInput
        },
		computed: {
			...mapState({
				state: state => state.comment
            })
		},
        data() {
			return {
			}
        }
    }
</script>
