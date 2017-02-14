<template>
    <div class="comment-body cb">
        <comment-list-box></comment-list-box>
    </div>
</template>
<style lang="scss">
    .comment-body {
        background-color: white;
        .list-control {
            padding: 32px 32px 12px 32px !important;
            .right-control {
                float: none!important;
            }
        }
    }
</style>
<script lang="babel">
    import CommentListBox from './CommentListBox.vue';

    export default{
    	components: {
			CommentListBox
        },
        data() {
            return {

            }
        }
    }
</script>
