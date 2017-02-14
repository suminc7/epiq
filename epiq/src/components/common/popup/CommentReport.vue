<template>
    <div class="popup comment-report" data-scroll-scope="force">
        <a @click="closePopup" href="#" class="close-btn"></a>
        <form id="reportForm" class="report-form">
            <div class="title">{{ $t('comment.report_title') }}</div>
            <div class="radio-container">
                <div class="radio" v-for="list in commentReport.lists">
                    <input type="radio" name="report" :id="list.id" :value="list.id" v-model="selected">
                    <label class="radio-inline" :for="list.id">{{ list[lang] }}</label>
                </div>
            </div>
            <div class="desc" v-html="$t('comment.report_description')"></div>
            <div class="btns">
                <a href="#" @click="submit" :class="{disable: !selected}" class="btn-large btn-large-blue xlarge">{{ $t('comment.report_send_btn') }}</a>
            </div>
        </form>
    </div>
</template>

<script lang="babel">
	import { mapGetters, mapActions } from 'vuex'

    export default {
		computed: {
			...mapGetters('popup', [
				'commentReport'
			])
		},
		methods: {
			...mapActions('popup', [
				'closePopup',
                'submitCommentReport'
			]),
            submit(){
				this.selected && this.submitCommentReport(this.selected).catch(error => {
					if(error.response.data.code === 907){
						window.alert(this.$t('comment.already'))
					}
				})
            }
        },
        data () {
            return {
                lang: window.epiq.lang,
                selected: null
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