import Locale from "../../utils/Locale";
import Cookie from "../../utils/Cookie";
import Tracking from "../../utils/Tracking";

let $guide;

const cookieName = 'main_popup';
const cookieValue = 'v2';

export default class MainPopup {
    constructor(){
        this.popupValue = Cookie.getCookie(cookieName);
        this.init();
    }

    el(){

        if(this.popupValue == cookieValue){
            return '';
        }

        const backImage = `/images/common/popup/pop_dalchi_${epiq.lang}.jpg`;


        return `<div id="mainPopup">
                    <a href="/notice#3" class="img" style="background-image: url(${backImage})"></a>
                    <div class="bottom">
                        <a href="#" class="close-btn"></a>
                        <span class="inner">
                            <span class="checkbox white">
                                <input type="checkbox" id="doNotShow" value="Y" name="doNotShow" />
                                <label for="doNotShow" class="checkbox-label">${Locale.prop('detail.show_again')}</label>
                            </span>
                        </span>
                    </div>
                </div>`;
    }



    init(){

        $('#content').append(this.el());
        $guide = $('#mainPopup');

        if(this.popupValue != cookieValue){
            $guide.addClass('active');

            const $closeBtn = $('.close-btn', $guide);
            const $inputCheck = $('#doNotShow', $guide);
            const $img = $('.img', $guide);





            $img.bind('click', () => {
                Tracking.send('index', 'click', 'main_popup');
            });

            $closeBtn.bind('click', () => {
                Tracking.send('index', 'click', 'main_popup_close');
                this.closeGide();
            });

            $inputCheck.bind('click', () => {
                Tracking.send('index', 'click', 'main_popup_donotshow');
                Cookie.setCookie(cookieName, cookieValue, 180);
                this.closeGide();
            });
        }
    }

    show(){

    }

    closeGide(){
        TweenMax.to($guide, 0.3, {autoAlpha: 0, onComplete: () => {
            $guide.remove();
        }});
    };
}