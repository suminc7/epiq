import {} from '../common/global';
import MyVideos from './mypage/MyVideos';
import PlayList from './mypage/PlayList';
import Channel from './mypage/Channel';
import Mylog from './mypage/Mylog';
import BottomMenu from "./footer/BottomMenu";
import ListTabButton from "../components/ListTabButton";
import URLS from "../utils/urls";
import MyChannel from "./mypage/MyChannel";


export default class Mypage extends MyChannel {

    constructor() {
        super();

        this.uid = $('.user').data('uid');

        this.listTabBtn = $('.list-tab a');
        this.tabList = {
            video: new MyVideos(URLS.ownList, 'mypage'),
            playlist: new PlayList,
            channel: new Channel,
            mylog: new Mylog
        };
        this.init();

        super.initPage('mypage');
    }

    init(){
        new ListTabButton(this.listTabBtn, this.tabList);
        new BottomMenu();
    }


}

new Mypage();













