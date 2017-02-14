<template>
    <div @click.self="closePopup" id="popup" v-show="type" data-scroll-scope="force">
        <comment-report v-if="type === 'COMMENT_REPORT'"></comment-report>
        <comment-report-complete v-if="type === 'SUBMIT_COMMENT_REPORT'"></comment-report-complete>
    </div>
</template>
<script lang="babel">
    import CommentReport from './CommentReport.vue'
    import CommentReportComplete from './CommentReportComplete.vue'
	import { mapGetters, mapActions, mapState } from 'vuex'

    export default {

        components: {
            CommentReport,
            CommentReportComplete
        },
        computed: {
            ...mapState({
				type: state => state.popup.type
            })
        },
		methods: {
			...mapActions('popup', [
				'closePopup'
			])
		},
        data () {
            return {

            }
        }
    }
</script>
<style lang="scss">
    @import '~sass/variables';

    #popup {
        text-align: left;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        z-index: 209482390482;

        .popup {
            position: absolute;
            left: 50%;
            top: 50%;
            background-color: white;
            text-align: left;
            padding: 50px;
            .line {
                margin: 35px 10px 35px 0;
                height: 1px;
                background-color: #DBDDDF;
            }
            .title {
                margin-bottom: 5px;
                font-size: 30px;
                color: $color-title;

            }
            .desc {
                font-size: 13px;
                margin: 25px 0 30px;
            }
            .btns {
                margin-top: 30px;
                text-align: center;
            }
            .close-btn {
                position: absolute;
                right: 0;
                top: 0;
                width: 50px;
                height: 50px;
                background: url("../images/common/popup_close.png") no-repeat center;
                background-size: 19px;
            }
            .radio-container {
                margin: 30px 0 15px 0;
                border-top: 1px solid #dbdddf;
                border-bottom: 1px solid #dbdddf;
                padding: 30px 0;

                .radio {
                    color: $color-title;
                    font-size: 13px;
                    margin-top: 22px;
                    &:first-child {
                        margin-top: 0;
                    }
                }
            }
        }

    }
</style>