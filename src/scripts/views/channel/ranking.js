import list from "../../utils/apis/list";
import URLS from "../../utils/urls";
import AppendTemplete from "../../components/AppendTemplete";
import ChannelRanking from "../../templetes/channel/ChannelRanking";
import ListMore from "../common/ListMore";
import Const from "../../common/Const";

export default class Ranking {


    constructor() {
        this.tabItem = $('#Ranking');
        this.channelContainer = $('.list-container', this.tabItem);
        this.option = {channelOffset: 0, channelSize: Const.rankListSize};
        this.init();

    }

    init(){

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
        this.loadList(URLS.channelRank, this.option);
    }

    loadList(url, obj){
        list(url, obj, (data) => {


                const userDtoList = Array.from(data.channelAndContentDtoList, (x) => x.userDto);
                const templete = new AppendTemplete();
                templete.append({
                    dataList: userDtoList,
                    element: this.channelContainer,
                    ClassItem: ChannelRanking,
                    listType: 'default',
                    option: obj
                });


        });
    }


}