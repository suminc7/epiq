import DefaultPopup from "../../views/common/DefaultPopup";
import Locale from "../../utils/Locale";
import Clipboard from "clipboard";
import Tracking from "../../utils/Tracking";

export default class SnsPopup extends DefaultPopup {
    constructor(type){
        super();
        this.type = type;
        this.init();
    }

    init(){

        this.initTag();

    }

    initTag(){

        // <!--<a href="#" class="naver">${Locale.prop('detail.sns_naver')}</a>-->
        // <!--<a href="#" class="kakao">${Locale.prop('detail.sns_kakao')}</a>-->
        const url = window.location.href;
        // const url = 'https://www.youtube.com/watch?v=YZnNrAOMw4I';


        const desc = $('.video-title span').html();
        const winProps = 'width=500,height=450,resizable=no';

        const tag = `<div id="SnsPopup" class="blind" data-scroll-scope="force">
                        <div class="popup sns" data-scroll-scope="force">
                            <a href="#" class="close-btn"></a>
                            <div class="popup-form">
                                <div class="title">${Locale.prop('detail.sns_title')}</div>
                                <div class="sns-wrap cb">
                                    <a href="#" class="facebook">${Locale.prop('detail.sns_facebook')}</a>
                                    <a href="#" class="twitter">${Locale.prop('detail.sns_twitter')}</a>
                                    <a href="#" class="google">${Locale.prop('detail.sns_google')} </a>
                                </div>
                                <div class="link-container">
                                    <div class="link-title">${Locale.prop('detail.sns_title')}</div>
                                    <div class="link-input-wrap cb">
                                        <input id="copyurl" type="text" value="${url}">
                                        <a href="#" id="copyBtn" class="copy-btn btn-def btn-def-black" data-clipboard-target="#copyurl">${Locale.prop('detail.sns_copy')}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;

        $('#content').append(tag);

        super.element = this.$element = $('#SnsPopup');

        new Clipboard('.copy-btn');

        $('.copy-btn').bind('click', () => {
            Tracking.send('view', 'click', 'share_link');
            this.hide();
        });

        $('.sns-wrap .facebook').bind('click', () => {
            this.openSnsPopup(`http://www.facebook.com/sharer.php?u=${url}`, '', winProps);
            Tracking.send('view', 'click', 'share_facebook');
        });

        $('.sns-wrap .twitter').bind('click', () => {
            let text = desc.length > 82 ? desc.substring(0, 80) + '..' : desc;
            const twText = encodeURIComponent(text);
            const twUrl = encodeURIComponent(url);

            this.openSnsPopup(`https://twitter.com/intent/tweet?url=${twUrl}&text=${twText}`, '', winProps);
            Tracking.send('view', 'click', 'share_twitter');
        });

        $('.sns-wrap .naver').bind('click', () => {
            this.openSnsPopup(`http://blog.naver.com/LinkShare.nhn?url=${url}`, '', winProps);
            Tracking.send('view', 'click', 'share_naver');
        });
        $('.sns-wrap .kakao').bind('click', () => {
            this.openSnsPopup(`https://story.kakao.com/share?url=${url}`, '', winProps);
            Tracking.send('view', 'click', 'share_kakao');
        });

        $('.sns-wrap .google').bind('click', () => {
            this.openSnsPopup(`https://plus.google.com/share?url=${url}`, '', 'width=420,height=500,resizable=no');
            Tracking.send('view', 'click', 'share_google');
        });

    }

    openSnsPopup(url, title, size){
        window.open(url, title, size).focus();
        this.hide();
    }


    reset(){

    }


}