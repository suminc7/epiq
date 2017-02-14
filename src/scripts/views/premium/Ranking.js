import list from "../../utils/apis/list";
import URLS from "../../utils/urls";
import AppendTemplete from "../../components/AppendTemplete";
import PremiumRanking from "../../templetes/premium/PremiumRanking";
import ListMore from "../common/ListMore";
import Const from "../../common/Const";

export default class Ranking {


    constructor() {
        this.tabItem = $('#Ranking');
        this.channelContainer = $('.list-container', this.tabItem);
        this.option = {offset: 0, size: Const.rankListSize};
        this.init();
    }

    init(){
    }

    active(){
        this.tabItem.addClass('active');
        new ListMore(this, this.channelContainer);
        this.load();
    }

    deactive(){
        this.tabItem.removeClass('active');
    }

    load(){
        this.loadList(URLS.premiumRank, this.option);
    }

    loadList(url, obj){
        list(url, obj, (data) => {


            const templete = new AppendTemplete();
            templete.append({
                dataList: data.contentSearchResults,
                element: this.channelContainer,
                ClassItem: PremiumRanking,
                listType: 'default',
                option: obj
            });

        });
    }


}