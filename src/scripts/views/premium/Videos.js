
import {list} from '../../utils/apis/list';
import URLS from '../../utils/urls';
import AppendTemplete from "../../components/AppendTemplete";
import VideoListItem from "../../templetes/default/VideoListItem";
import ListMore from "../common/ListMore";
import ListControlButton from "../../components/ListControlButton";
import {RECENTLY} from "../../common/orderByField";
import Const from "../../common/Const";

class Videos {


    constructor() {

        this.tabItem = $('#Videos');
        this.channelContainer = $('.list-box', this.tabItem);
        this.option = {orderByField: RECENTLY, offset: 0, size: Const.videoSize};
        this.init();
    }

    init(){
        this.sortBtn = $('.list-control .right-control a', this.tabItem);
        new ListControlButton(this);
    }

    active(){
        new ListMore(this, this.channelContainer);
        this.tabItem.addClass('active');
        this.load();

    }

    deactive(){
        this.tabItem.removeClass('active');
    }

    load(){
        this.loadList(URLS.premiumList, this.option);
    }

    loadList(url, obj){
        list(url, obj, (data) => {

            const templete = new AppendTemplete();
            templete.append({
                dataList: data.contentSearchResults,
                element: this.channelContainer,
                ClassItem: VideoListItem,
                listType: 'default',
                option: obj
            });

        });
    }


}

export default Videos;










