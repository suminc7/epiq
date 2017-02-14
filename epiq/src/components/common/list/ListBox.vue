<template>
    <div>
        <template v-if="state.lists.length === 0">
            <list-nothing :listType="listType"></list-nothing>
        </template>
        <template v-else>
            <list-sorting :order="state.params.orderByField" :expect="expect" @changedOrder="changedOrder"></list-sorting>
            <slot></slot>
            <list-more class="white" :listTotalCount="state.listTotalCount" :offset="state.params.offset" :size="state.params.size" @listMore="listMore"></list-more>
        </template>
    </div>
</template>
<script lang="babel">
	import ListSorting from '../../common/list/ListSorting.vue'
	import ListNothing from '../../common/list/ListNothing.vue'
	import ListMore from '../../common/list/ListMore.vue'

    export default {
    	props: {
    	    state: {
    	    	type: Object
            },
            listType: {
    	    	type: String
            },
			expect: {
    	    	type: String
            },
			loadListName: {
    	    	type: String
            }
        },
		components: {
			ListSorting,
			ListNothing,
			ListMore
		},
		methods: {
			load(params){
				this.$store.dispatch(this.loadListName, params)
			},
			changedOrder({ orderByField }) {
				this.load({...this.state.params, orderByField, offset: 0 });
			},
			listMore(offset){
				this.load({...this.state.params, offset});
			}
		},
		created() {
			this.load(this.state.params)
		},
        data() {
            return {
            }
        }
    }
</script>
<style lang="scss">
    @import '~sass/variables';
    .list-nothing {
        display: block!important;
        height: 365px;
        .message {
            color: $color-title;
        }
        .img {
            background-size: contain;
            margin: 0 auto 20px auto;
        }
        &.comment {
            .img {
                width: 64px;
                height: 70px;
                background-image: url(../images/common/list_nothing_comment.png);
            }
        }
    }
</style>