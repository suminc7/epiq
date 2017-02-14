import list from '../../utils/apis/list';
import request from '../../utils/apis/request';
import URLS from '../../utils/urls';
import ButtonActive from "../../components/ButtonActive";
import VideoListItem from "../../templetes/default/VideoListItem";
import AppendTemplete from "../../components/AppendTemplete";
import ListMore from "../common/ListMore";
import Const from "../../common/Const";


class Mylog {

    constructor() {

        this.tabItem = $('#myLog');
        this.listBox = $('.list-box', this.tabItem);
        this.$listNotthing = $('.list-nothing', this.tabItem);
        this.$recentlyBtn = $('.list-control-history > a', this.tabItem);
        this.$deleteBtn = $('.list-control-history .delete-btn', this.tabItem);
        this.option = {offset: 0, size: Const.videoSize};
        this.url = URLS.recentlyList;

        this.init();
    }

    init(){
        new ButtonActive(this.$recentlyBtn);


        this.$recentlyBtn.bind('click', (e) => {

            if($(e.currentTarget).hasClass('recently')){
                this.url = URLS.recentlyList;
            }else{
                this.url = URLS.recentlyLikeList;
            }
            this.option.offset = 0;

            this.load();
        });


        this.$deleteBtn.bind('click', (e) => {
            e.preventDefault();

            this.$listItem = $('.list-item', this.listBox);

            let itemList = [];
            this.$listItem.each(function(){
                const idx = $(this).data('cid');
                itemList.push(idx);
            });
            const data = $.param({contentIds: itemList.toString()});
            // const data = $.param(itemList);
            this.deleteList(data);
        });

    }

    active(){
        new ListMore(this, this.listBox);
        this.tabItem.addClass('active');
        this.load(URLS.recentlyList);
    }

    deactive(){
        this.tabItem.removeClass('active');
    }

    load(){
        this.loadList(this.url, this.option);
    }

    loadList(url, obj){
        list(url, obj, (data) => {

            const templete = new AppendTemplete();
            templete.append({
                dataList: data.contentSearchResults,
                element: this.listBox,
                ClassItem: VideoListItem,
                listType: 'default',
                option: obj
            });


            if(url === URLS.recentlyList) {
                this.tabItem.removeClass('like').addClass('recently');
            }else{
                this.tabItem.removeClass('recently').addClass('like');
            }
        });
    }

    deleteList(obj){
        const _this = this;
        request(URLS.recentlyDeleteAll, obj, function(data){
            _this.tabItem.addClass('nothing-list');
            _this.listBox.html('');
        }, null, 'POST');

    }


}

export default Mylog;