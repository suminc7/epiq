import FollowButton from "../../components/FollowButton";
import VideoMeta from "../default/VideoMeta";
import StringUtils from "../../utils/StringUtils";

class ChannelProfile {


    constructor(obj) {
        this.obj = obj;
    }

    list(userDto){

        let {
            userId,
            nickname,
            userProfileDtoList,
            greeting
        } = userDto;


        const profilePath = userProfileDtoList.length > 0 ? userProfileDtoList[0].profilePath : 'undefined';

        // const followBtn = new FollowButton();
        // const followBtnEl = followBtn.createElement(isFollow, userId);
        // const isNew = isFollow === 'Y' ? `<div class="icon-new"></div>` : '';
        const isNew = '';
        // const isPro = isFollow === 'Y' ? `<span class="mark-pro">PRO</span>` : '';
        const isPro = '';

        const videoMeta = new VideoMeta({listType: 'userChannel'}).list(userDto);


        const titleLenth = this.obj.listType == 'mypage' ? 30 : 70;
        greeting = StringUtils.titleSubstring(greeting, titleLenth);

        const el = `
            <div class="channel-profile">
                <div class="profile-image" style="background-image: url(${profilePath})">${isNew}</div>
                <div class="content-wrap">
                    <div class="channel">
                        <a href="/channel/user?userId=${userId}">${nickname}</a>
                        ${isPro}
                    </div>
                    <div class="desc">${greeting}</div>
                    ${videoMeta}
                </div>
            </div>`;
        return el;
    }


}

export default ChannelProfile;