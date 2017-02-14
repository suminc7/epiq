
import {list} from '../../utils/apis/list';
import URLS from '../../utils/urls';
import AppendTemplete from "../../components/AppendTemplete";
import VideoListItem from "../../templetes/default/VideoListItem";
import ListMore from "../common/ListMore";
import ListControlButton from "../../components/ListControlButton";
import Locale from "../../utils/Locale";
import Const from "../../common/Const";

class Videos {


    constructor(keyword) {
        this.keyword = keyword;
        this.tabItem = $('#Videos');
        this.container = $('.list-box', this.tabItem);
        this.sortBtn = $('.list-control .right-control a', this.tabItem);
        this.option = {keywordSearchItem: 'CONTENT', keyword: this.keyword, offset: 0, size: Const.videoSize};
        this.init();
    }

    init(){

        const listLength = `${Locale.prop('search.videos')} <span class="leng-item">0</span>`;
        $('.list-control', this.tabItem).prepend(`<div class="list-length">${listLength}</div>`);

        new ListControlButton(this);
    }

    active(){
        new ListMore(this, this.container);
        this.tabItem.addClass('active');
        this.load();
    }

    deactive(){
        this.tabItem.removeClass('active');
    }

    load(){
        this.loadList(URLS.searchKeyword, this.option);
    }

    loadList(url, obj){
        list(url, obj, (data) => {

            $('.list-length .leng-item', this.tabItem).html(data.contentTotalCnt);

            const templete = new AppendTemplete();
            templete.append({
                dataList: data.contentSearchResults,
                element: this.container,
                ClassItem: VideoListItem,
                listType: 'default',
                option: obj
            });
        });
    }


}

export default Videos;










