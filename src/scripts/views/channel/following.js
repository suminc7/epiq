import URLS from "../../utils/urls";
import {list} from "../../utils/apis/list";
import AppendTemplete from "../../components/AppendTemplete";
import ChannelFollowing from "../../templetes/channel/ChannelFollowing";
import {POPULAR, RECENTLY, TITLE} from '../../common/orderByField';
import ListMore from "../common/ListMore";
import ListControlButton from "../../components/ListControlButton";
import Const from "../../common/Const";

export default class Following {


    constructor() {
        this.tabItem = $('#Following');
        this.sortBtn = $('.list-control .right-control a', this.tabItem);
        this.channelContainer = $('.list-container', this.tabItem);
        this.userId = this.tabItem.data('uid');
        this.option = {userId: this.userId, orderByField: RECENTLY, offset: 0, size: Const.followListSize};
        this.init();

    }

    init(){

        new ListControlButton(this);


    }

    active(){
        new ListMore(this, this.channelContainer);
        this.tabItem.addClass('active');
        this.load();
    }

    deactive(){
        this.tabItem.removeClass('active');
        this.channelContainer.html('');
    }

    load(){
        this.loadList(URLS.followingList, this.option);
    }

    loadList(url, obj){
        list(url, obj, (data) => {


            const templete = new AppendTemplete();
            templete.append({
                dataList: data.followOrFollowingList,
                element: this.channelContainer,
                ClassItem: ChannelFollowing,
                listType: 'default',
                option: obj
            });

        });
    }



}