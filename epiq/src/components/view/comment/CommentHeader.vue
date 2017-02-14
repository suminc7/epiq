<template>
    <div class="comment-header">
        <div class="comment-total-count">{{ $t('comment.count_header') }} {{ listTotalCount | number }}{{ $t('comment.count_footer') }}</div>
        <comment-input></comment-input>
    </div>
</template>
<script lang="babel">
    import CommentInput from './CommentInput.vue'
    import { mapGetters } from 'vuex'

    export default {
        components: {
          CommentInput
        },
        computed: {
            ...mapGetters('comment', [
            	'listTotalCount'
            ])
        },
        data(){

            return {

            }
        }
    }
</script>
<style lang="scss">
    @import '~sass/variables';

    .comment-header {
        padding: 32px;
        background: white;
        margin-bottom: 1px;
        .comment-total-count {
            font-weight: 400;
            font-size: 15px;
            color: $color-title;
            margin-bottom: 24px;
        }
    }
</style>