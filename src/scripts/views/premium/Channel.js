import URLS from "../../utils/urls";
import list from "../../utils/apis/list";
import ChannelRecommend from "../../templetes/channel/ChannelRecommend";
import AppendTemplete from "../../components/AppendTemplete";
import ListMore from "../common/ListMore";
import Const from "../../common/Const";
import SliderList from "../extends/SliderList";
import VideoListItem from "../../templetes/default/VideoListItem";
import {RECENTLY} from "../../common/orderByField";


export default class Channel {

    constructor() {
        this.tabItem = $('#Channel');
        this.channelContainer = $('.list-container', this.tabItem);
        this.option = {contentOrderByField:RECENTLY, channelSearchItem: 'PREMIUM_CHANNEL', channelOffset: 0, channelSize: Const.channelSize, contentOffset: 0, contentSize: Const.slideVideoSize, isContentSearchTotalCnt: 'Y'};
        this.init();
    }

    init(){
        new SliderList(this.tabItem, this.loadSliderList);
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
        this.loadList(URLS.premiumRecommend, this.option);
    }

    loadList(url, obj){
        list(url, obj, (data) => {
            const templete = new AppendTemplete();
            templete.append({
                dataList: data.channelAndContentDtoList,
                element: this.channelContainer,
                ClassItem: ChannelRecommend,
                listType: 'premium',
                option: obj
            });
        });
    }

    loadSliderList($element, offset){

        const option = {searchUserId: $element.data('uid'), offset, size: Const.slideNextVideoSize, isSearchTotalCnt: 'Y'};

        list(URLS.contentChannel, option, (data) => {

            const templete = new AppendTemplete();
            templete.append({
                dataList: data.contentSearchResults,
                element: $element.find('.list-body'),
                ClassItem: VideoListItem,
                listType: 'premium',
                option: option
            });

        });
    }

}