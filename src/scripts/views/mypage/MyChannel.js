import FollowPopup from "./FollowPopup";
import request from "../../utils/apis/request";
import URLS from "../../utils/urls";
import StringUtils from "../../utils/StringUtils";



const $videoCount = $('.video-count .value');
const $likeCount = $('.like-count .value');
const $followerCount = $('.follower-count .value');
const $followingCount = $('.following-count .value');

let followPopup;

export default class MyChannel {
    constructor(){
        this.uid = $('.user').data('uid');
    }

    initPage(pageType){

        this.pageType = pageType;

        //유저 인사말
        const $wrap = $('.desc-wrap');
        let text = $wrap.html();
        text = StringUtils.replaceNewlineTobr(text);
        $wrap.html(text);


        //팔로워 목록보기 버튼
        $('#FollowerPopupBtn').bind('click', (e) => {
            this.initFollowPopup('follower');
            e.preventDefault();
        });

        //팔로잉 목록보기 버튼
        $('#FollowingPopupBtn').bind('click', (e) => {
            this.initFollowPopup('following');
            e.preventDefault();
        });

    }

    initFollowPopup(type){
        if(!followPopup) followPopup = new FollowPopup();
        followPopup.show(type, this.getInfo.bind(this));
    }

    /**
     * 팔로잉 팔로워 목록보기 창을 닫으면 수치 업데이트를 한다.
     */
    getInfo(){

        if(this.pageType === 'userChannel'){
            return;
        }

        request(URLS.channelInfo, `userId=${this.uid}`,
        (data) => {
            if(data.code === 200){

                const { totalOwnContent, totalLike, followerCnt, followingCnt } = data;

                $videoCount.html(totalOwnContent);
                $likeCount.html(totalLike);
                $followerCount.html(followerCnt);
                $followingCount.html(followingCnt);
            }
        }, null, 'GET');


    }

}