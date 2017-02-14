import {menuActive} from '../common/global';
import BottomMenu from "./footer/BottomMenu";
import Ranking from "./premium/Ranking";
import Videos from "./premium/Videos";
import Channel from "./premium/Channel";
import ListTabButton from "../components/ListTabButton";
// import Banner from "./channel/Banner";
import Banner from "./index/Banner";

export default class Premium {


    constructor() {
        this.listTabBtn = $('.list-tab a');
        this.tabList = {
            videos: new Videos,
            channel: new Channel,
            ranking: new Ranking
        };
        this.init();

    }

    init(){
        // new Banner(0);
        new Banner('PREMIUM');
        new ListTabButton(this.listTabBtn, this.tabList);
        new BottomMenu();
        menuActive(2);
    }

    active(){

    }

    deactive(){

    }

}

new Premium();













