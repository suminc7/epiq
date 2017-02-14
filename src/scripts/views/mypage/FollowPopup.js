import DefaultPopup from "../common/DefaultPopup";
import Locale from "../../utils/Locale";
import ChannelFollowing from "../../templetes/channel/ChannelFollowing";
import list from "../../utils/apis/list";
import AppendTemplete from "../../components/AppendTemplete";
import URLS from "../../utils/urls";
import ListControl from "../../templetes/default/ListControl";
import ListControlButton from "../../components/ListControlButton";
import {RECENTLY} from "../../common/orderByField";
import ListMore from "../common/ListMore";
import Const from "../../common/Const";

export default class FollowPopup extends DefaultPopup {
    constructor(type){
        super();
        this.type = type;
        this.userId = $('.user').data('uid');
        this.option = {userId: this.userId, orderByField: RECENTLY, offset: 0, size: Const.channelListSize};
        this.init();
    }

    init(){

        this.initTag();

    }

    initTag(){

        const listControl = new ListControl();

        const tag = `<div id="FollowPopup" class="blind" data-scroll-scope="force">
                        <div class="popup popup2" data-scroll-scope="force">
                            <a href="#" class="close-btn"></a>
                            <div class="title"></div>
                            ${listControl.element()}
                            <div class="scroll scrollbar-macosx" data-scroll-scope>
                                <div class="scroll-inner">
                                    <ul class="list-container"></ul>
                                    <a href="#" class="list-more">
                                        <span>${Locale.prop('common.btn_more')}</span>
                                    </a>
                                    <div class="list-nothing"></div>
                                    <div class="alert-text"></div>
                                </div>
                            </div>
                        </div>
                    </div>`;

        $('#content').append(tag);

        this.tabItem = super.element = $('#FollowPopup');
        this.listContainer = $('.list-container', this.tabItem);
        this.sortBtn = $('.list-control .right-control a', this.tabItem);
        this.title = $('.title', this.tabItem);
        this.alert = $('.alert-text', this.tabItem);
        this.nothing = $('.list-nothing', this.tabItem);

        this.listMore = new ListMore(this, this.listContainer);
        this.listControl = new ListControlButton(this);
    }

    show(type, hideCallback){

        this.hideCallback = hideCallback;

        if(type === 'follower'){
            this.nullText = Locale.prop('detailchannel.follow_null');
            this.privateText = Locale.prop('detailchannel.follow_hidden');
            this.titleText = Locale.prop('detailchannel.all_follower');
            this.url = URLS.userFollowerList;
        }else{
            this.nullText = Locale.prop('detailchannel.following_null');
            this.privateText = Locale.prop('detailchannel.following_hidden');
            this.titleText = Locale.prop('detailchannel.all_following');
            this.url = URLS.userFollowingList;
        }

        this.title.html(this.titleText);
        this.nothing.html(this.nullText);

        this.option.offset = 0;

        this.load();

        this.tabItem.addClass('active');
    }

    load(){
        this.loadList(this.url, this.option);
    }

    loadList(url, obj){
        list(url, obj, ({followOrFollowingList}) => {

            const templete = new AppendTemplete();
            templete.append({
                dataList: followOrFollowingList,
                element: this.listContainer,
                ClassItem: ChannelFollowing,
                listType: 'mypage',
                option: obj
            });
        }, ({code}) => {
            if(code === 617 || code === 618){
                this.tabItem.addClass('alert');
                this.alert.html(this.privateText);
            }
        });
    }

    reset(){
        this.tabItem.removeClass('alert').removeClass('nothing-list');
        this.listContainer.html('');
        this.listControl.reset();
        this.listMore.element.removeClass('active');
    }

    hideHandler(){
        this.hideCallback();
    }


}