import Locale from "../../utils/Locale";
import Cookie from "../../utils/Cookie";

let $guide;

export default class GuidePopup {
    constructor(){
        this.viewGuideValue = Cookie.getCookie('view_guide');
    }

    el(){

        if(this.viewGuideValue == '1'){
            return '';
        }


        return `<div id="guide">
            <div class="lt">
            <a href="#" class="close-btn"></a>
            <span class="checkbox white">
                <input type="checkbox" id="doNotShow" value="Y" name="doNotShow" />
                <label for="doNotShow" class="checkbox-label">${Locale.prop('detail.show_again')}</label>
            </span>
            </div>
            <div class="rt">
                <div class="icon report"><div class="txt">${Locale.prop('detail.icon_report')}</div></div>
                <div class="icon like"><div class="txt">${Locale.prop('detail.icon_like')}</div></div>
            </div>
            <div class="rb">
                <div class="icon fullscreen"><div class="txt">${Locale.prop('detail.icon_fullscreen')}</div></div>
                <div class="icon setting"><div class="txt">${Locale.prop('detail.icon_setting')}</div></div>
            </div>
            <div class="center">
                <div class="img"></div>
                ${Locale.prop('detail.mouse')}
            </div>
        </div>`;
    }

    init(){
        $guide = $('#guide', this.$player);



        if(this.viewGuideValue != '1'){
            $guide.addClass('active');

            const $closeBtn = $('.close-btn', $guide);
            const $inputCheck = $('#doNotShow', $guide);



            $closeBtn.bind('click', () => {
                this.closeGide();
            });

            $inputCheck.bind('click', () => {
                Cookie.setCookie('view_guide', '1', 180);
                this.closeGide();
            });
        }
    }

    closeGide(){
        TweenMax.to($guide, 0.3, {autoAlpha: 0, onComplete: () => {
            $guide.remove();
        }});
    };
}