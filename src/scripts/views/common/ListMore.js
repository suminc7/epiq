

export default class ListMore {
    /**
     *
     * @param parent
     * @param $listContainer
     */
    constructor(parent, $listContainer){
        this.parent = parent;
        this.option = parent.option;
        this.$moreBtn = parent.tabItem.find('.list-more');
        this.type = this.option.hasOwnProperty('channelOffset') ? 'channel' : 'default';
        this.offset = -1;
        this.pageSize = -1;

        //reset
        if(this.type === 'default'){
            this.offset = this.option.offset = 0;
            this.pageSize = this.option.size;
        }else{
            this.offset = this.option.channelOffset = 0;
            this.pageSize = this.option.channelSize;
        }

        //로딩후에 length 값과 현재 페이지 사이즈와 비교한다.
        //AppendTemplete.js 에서 trigger 한다.
        $listContainer.bind('appended', (e, length) => {

            // console.log(e);

            // length = 0;
            //console.log(length, this.offset);
            if(length === 0 && this.offset === 0){
                parent.tabItem.addClass('nothing-list');
            }else{
                parent.tabItem.removeClass('nothing-list');
            }


            //채널의 슬라이더에선 버튼을 삭제하지 않는다.
            if(e.target.className === 'list-body') return;

            if(length < this.pageSize){
                this.$moreBtn.removeClass('active');
            }else{
                this.$moreBtn.addClass('active')
            }
        });


        this.init();
    }

    init(){

        //binded 여러번 호출되는걸 방지한다.
        if(this.$moreBtn.hasClass('binded')){
            return;
        }

        this.$moreBtn.addClass('binded').bind('click',() => {

            if(this.type === 'default'){
                this.offset = this.option.offset += this.option.size;
                this.pageSize = this.option.size;
            }else{
                this.offset = this.option.channelOffset += this.option.channelSize;
                this.pageSize = this.option.channelSize;
            }
            this.parent.load();

        });

    }

    get element(){
        return this.$moreBtn;
    }
}