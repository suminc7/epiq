import {menuActive} from '../common/global';
import Recommend from './channel/recommend'
import Following from "./channel/following";
import Ranking from "./channel/ranking";
import BottomMenu from "./footer/BottomMenu";
import ListTabButton from "../components/ListTabButton";
// import Banner from "./channel/Banner";
import Banner from "./index/Banner";

export default class Channel {

    constructor() {

        this.listTabBtn = $('.list-tab a');
        this.tabList = {
            recommend: new Recommend,
            following: new Following,
            ranking: new Ranking
        };

        this.init();

    }

    init(){
        // new Banner(0);
        new Banner('CHANNEL');
        new ListTabButton(this.listTabBtn, this.tabList);
        new BottomMenu();
        menuActive(1);
    }

    active(){

    }

    deactive(){

    }

}

new Channel();













