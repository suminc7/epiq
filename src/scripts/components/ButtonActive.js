
class ButtonActive {


    constructor($obj, idx = -1) {
        this.$obj = $obj;
        if(idx > -1){
            this.$obj.eq(idx).addClass('active');
        }
        this.$first = this.$current = $obj.filter('.active') ;

        this.init();
    }

    init(){

        this.$obj.click((e) => {
            if(this.$current){
                this.$current.removeClass('active');
            }
            const $this = $(e.currentTarget);
            $this.addClass('active');
            this.$current = $this;
            e.preventDefault();

        });
    }

    setActiveBtn($obj){
        if(this.$current){
            this.$current.removeClass('active');
        }
        this.$current = $obj.addClass('active');
    }

    reset(){
        if(this.$current){
            this.$current.removeClass('active');
        }
        this.$current = this.$first.addClass('active');
    }
}

export default ButtonActive;