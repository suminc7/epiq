import URLS from "../../utils/urls";

export default class Introduction {
    constructor(){
        this.tabItem = $('#Introduction');

        this.$btn = $('.intro-inner .btns a');

        this.init();
    }

    init(){
        this.$btn.bind('click', e => {
            URLS.goLoginPageWithURL(e);
        });
    }


    active(){
        this.tabItem.addClass('active');
    }

    deactive(){
        this.tabItem.removeClass('active');
    }
}