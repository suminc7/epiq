import ButtonActive from "./ButtonActive";

class ListControlButton {


    constructor(parent) {

        this.parent = parent;

        this.init();
    }


    /**
     * sortBtn, option, load() 필요
     */
    init(){


        this.$firstBtn = this.$currentBtn = this.parent.sortBtn.filter('.active');

        this.parent.sortBtn.bind('click', (e) => {
            this.parent.option.orderByField = $(e.currentTarget).data('pid').toUpperCase();
            this.$currentBtn = $(e.currentTarget);
            this.parent.option.offset = 0;
            this.parent.load();
        });

        this.buttonActive = new ButtonActive(this.parent.sortBtn);

    }

    reset(){
        this.buttonActive.reset();
    }
}

export default ListControlButton;