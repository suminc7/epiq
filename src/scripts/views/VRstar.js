import {menuActive} from '../common/global';
import BottomMenu from "./footer/BottomMenu";
import Introduction from "./vrstar/Introduction";
import Stars from "./vrstar/Stars";
import Ranking from "./vrstar/Ranking";
import ListTabButton from "../components/ListTabButton";
// import Banner from "./channel/Banner";
import Banner from "./index/Banner";

export default class VRstar {

    constructor() {
        // super();



        this.listTabBtn = $('.list-tab a');
        this.tabList = {
            introduction: new Introduction,
            stars: new Stars,
            ranking: new Ranking
        };



        this.init();

    }

    init(){
        // new Banner(0);
        new Banner('VRSTAR');
        new ListTabButton(this.listTabBtn,  this.tabList);
        new BottomMenu();
        menuActive(3);
    }


}

new VRstar();













