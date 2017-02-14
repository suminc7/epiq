import URLS from "../../utils/urls";
import {list} from "../../utils/apis/list";
import AppendTemplete from "../../components/AppendTemplete";
import ChannelFollowing from "../../templetes/channel/ChannelFollowing";
import {POPULAR, RECENTLY, TITLE} from '../../common/orderByField';
import ListMore from "../common/ListMore";
import Locale from "../../utils/Locale";
import ListControlButton from "../../components/ListControlButton";
import Const from "../../common/Const";

export default class Channel {


    constructor(keyword) {
        this.keyword = keyword;
        this.tabItem = $('#Channel');
        this.container = $('.list-container', this.tabItem);
        this.sortBtn = $('.list-control .right-control a', this.tabItem);
        this.userId = this.tabItem.data('uid');
        this.option = {keywordSearchItem: 'CHANNEL', orderByField: RECENTLY, keyword: this.keyword, offset: 0, size: Const.channelListSize};
        this.init();

    }

    init(){
        const listLength = `${Locale.prop('search.channel')} <span class="leng-item">0</span>`;
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

            $('.list-length .leng-item', this.tabItem).html(data.channelTotalCnt);

            const templete = new AppendTemplete();
            templete.append({
                dataList: data.channelSearchResults,
                element: this.container,
                ClassItem: ChannelFollowing,
                listType: 'channel',
                option: obj
            });

        });
    }



}