import {} from '../common/global';
import PlayList from './mypage/PlayList';
import Channel from './mypage/Channel';
import FollowButton from '../components/FollowButton';
import BottomMenu from "./footer/BottomMenu";
import MyVideos from "./mypage/MyVideos";
import URLS from "../utils/urls";
import MyChannel from "./mypage/MyChannel";
import ListTabButton from "../components/ListTabButton";


export default class UserChannel extends MyChannel {
    constructor() {
        super();

        const followBtn = new FollowButton();
        followBtn.setElement($('.follow-btn'));

        this.listTabBtn = $('.list-tab a');
        this.tabList = {
            video: new MyVideos(URLS.contentChannel, 'default'),
            playlist: new PlayList,
            channel: new Channel
        };
        this.init();

        super.initPage('userChannel');
    }

    init(){
        new ListTabButton(this.listTabBtn, this.tabList);
        new BottomMenu();
    }
}

new UserChannel();