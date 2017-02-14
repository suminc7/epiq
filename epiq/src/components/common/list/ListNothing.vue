<template>
    <div class="list-nothing" :class="listType">
        <div class="inner">
            <div class="item">
                <div class="img"></div>
                <div  v-html="messages[listType]" class="message"></div>
            </div>
        </div>
    </div>
</template>
<script lang="babel">
    export default {
    	props: {
    	    listType: {
    	    	type: String
            }
        },
        data() {
            return {
				messages: {
					comment: this.$t('comment.list_nothing'),
				}
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