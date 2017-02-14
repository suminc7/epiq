import URLS from "../../utils/urls";

export default class BottomMenu {


    constructor(){
        this.menu = $('#bottomMenu');
        this.$top = $('#topBtn');
        this.$uploadBtn = $('#contentUploadBtn');
        this.init();
    }

    init(){
        this.menu.show();

        this.$uploadBtn.bind('click', e => {
            URLS.goLoginPageWithURL(e);
        });


        this.$top.bind('click', e => {
            TweenMax.to($('html, body'), 0.4, {scrollTop: 0, ease:Power1.easeOut})
        });

    }

}