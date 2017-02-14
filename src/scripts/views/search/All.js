import URLS from "../../utils/urls";
import list from "../../utils/apis/list";
import AppendTemplete from "../../components/AppendTemplete";
import SearchAll from "../../templetes/search/SearchAll";
import SliderList from "../extends/SliderList";
import Const from "../../common/Const";
import VideoListItem from "../../templetes/default/VideoListItem";
import ChannelListItem from "../../templetes/default/ChannelListItem";
import ListMore from "../common/ListMore";
import {RECENTLY} from "../../common/orderByField";


export default class All {

    constructor(keyword) {
        this.keyword = keyword;
        this.tabItem = $('#All');
        this.listContainer = $('.list-container', this.tabItem);
        this.videoContainer = $('.list-container.video-section', this.tabItem);
        this.channelContainer = $('.list-container.channel-section', this.tabItem);
        this.parentContainer = this.tabItem.parent();
        this.listNotthing = $('.list-nothing', this.tabItem);
        this.option = {orderByField: RECENTLY, keywordSearchItem: 'ALL', isSearchTotalCnt: 'Y', keyword: this.keyword, offset: 0, size: Const.slideVideoSize};
        this.init();

    }

    init(){
        new SliderList(this.tabItem, this.loadSliderList, {keyword: this.keyword});
    }

    active(){

        window.location.hash = '';

        new ListMore(this, this.listContainer);
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

        if(obj.keyword.length < 2){
            this.tabItem.addClass('nothing-list');
        }

        list(url, obj, (data) => {

            const templete = new AppendTemplete();
            templete.append({
                dataList: data,
                element: this.videoContainer,
                ClassItem: SearchAll,
                listType: 'videos',
                option: obj
            });

            (() => {
                const templete = new AppendTemplete();
                templete.append({
                    dataList: data,
                    element: this.channelContainer,
                    ClassItem: SearchAll,
                    listType: 'userChannel',
                    option: obj
                });
            })();

            /**
             * 검색시 채널이 있을때
             */
            if(data.channelSearchResults.length == 0){
                this.channelContainer.hide();
            }

            if(data.contentSearchResults.length == 0){
                this.videoContainer.hide();
            }

            if(data.channelSearchResults.length == 0 && data.contentSearchResults.length == 0) {
                this.tabItem.addClass('nothing-list');
            }
        });
    }


    loadSliderList($element, offset, data, searchItem){

        const option = {keywordSearchItem: searchItem, isSearchTotalCnt: 'Y', keyword: data.keyword, offset, size: Const.slideNextVideoSize};



        list(URLS.searchKeyword, option, (data) => {
            if(data.contentSearchResults){
                const templete = new AppendTemplete();
                templete.append({
                    dataList: data.contentSearchResults,
                    element: $element.find('.list-body'),
                    ClassItem: VideoListItem,
                    listType: 'default',
                    option: option
                });
            }else if(data.channelSearchResults){
                const templete = new AppendTemplete();
                templete.append({
                    dataList: data.channelSearchResults,
                    element: $element.find('.list-body'),
                    ClassItem: ChannelListItem,
                    listType: 'userChannel',
                    option: option
                });
            }
        });
    }


}