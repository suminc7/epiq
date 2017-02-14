<template>
    <div class="popup comment-report-complete">
        <a @click="closePopup" href="#" class="close-btn"></a>
        <div class="report-form">
            <div class="title">{{ $t('comment.report_done_title') }}</div>
            <div class="desc" v-html="$t('comment.report_done_description')"></div>
            <div class="btns">
                <a @click="closePopup" href="#" class="btn-large btn-large-blue xlarge">{{ $t('comment.report_done_ok') }}</a>
            </div>
        </div>
    </div>
</template>

<script lang="babel">
	import { mapGetters, mapActions } from 'vuex'

    export default {
		computed: {
			...mapGetters('popup', [
				'lists'
			])
		},
		methods: {
			...mapActions('popup', [
				'closePopup'
			])
        },
        data () {
            return {
                lang: window.epiq.lang
            }
        }
    }
</script>
<style lang="scss">
    @import '~sass/variables';

    .popup.comment-report {
        width: 580px;
        height: 550px;
        margin: -275px 0 0 -290px;
    }
    .popup.comment-report-complete {
        width: 460px;
        height: 295px;
        margin: -148px 0 0 -230px;
    }
</style>