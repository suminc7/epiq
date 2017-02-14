

export default class DefaultPopup {
    constructor(){

    }

    /**
     * this.el은 child 에서 셋팅 필요
     * @param el
     */
    set element(el){
        this.el = el;
        // this.el.find('.scroll').dontScrollParent();

        this.closeBtn = this.el.find('.close-btn');
        this.cancelBtn = this.el.find('.cancelBtn');

        this.cancelBtn.bind('click', (e) => {
            e.preventDefault();
            this.hide();
        });

        // this.el.dontScroll();
        // this.el.children('.popup').dontScroll();


        if($.browser.win){
            $(el).find('.scrollbar-macosx').scrollbar();
        }

        this.initDefaultPopup();
    }

    initDefaultPopup(){

        const blindHandler = {
            click: e => {
                if($(e.currentTarget).is(e.target)){
                    this.hide();
                    this.reset();
                    e.preventDefault();
                }
            }
        };

        this.el.bind(blindHandler);
        this.closeBtn.bind(blindHandler);

    }

    show(){
        this.el.addClass('active');
        this.showHandler();
    }

    showHandler(){

    }

    hide(){
        this.el.removeClass('active');
        this.hideHandler();
    }

    hideHandler(){

    }

    reset(){

    }


}