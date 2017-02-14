import Cookie from "../../utils/Cookie";


export default class Footer {
    constructor() {
        //lang=zh

        this.footer = $('#footer');
        this.langBtn = $('.lang a', this.footer);

        this.init();
    }

    init(){

        this.langBtn.click(function(){
            const pid = $(this).data('pid');
            Cookie.setCookie('lang', pid, 7);
            window.location.reload();

        });
    }
}

new Footer();
