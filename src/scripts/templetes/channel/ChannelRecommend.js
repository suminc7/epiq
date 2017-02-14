import ChannelProfile from "./ChannelProfile";
import ChannelListWrap from "./ChannelSliderListWrap";
import FollowButton from "../../components/FollowButton";


/*
    프리미엄페이지와 채널페이지에서 동일하게 사용한다.
 */
class ChannelRecommend {


    constructor(obj) {
        this.obj = obj;
    }

    list(listItem){

        let {
            userDto,
            contentSearchResults: contents,
            contentTotalCnt
        } = listItem;


        const channelProfileList = new ChannelProfile(this.obj).list(userDto);
        const channelListWrap = new ChannelListWrap(this.obj).list(contents);
        const followBtn = new FollowButton();
        const followBtnEl = followBtn.createElement(userDto.isFollow, userDto.userId);

        return `<li class="channel-item" data-uid="${userDto.userId}" data-contentTotal="${contentTotalCnt}">
                    <div class="profile-wrap cb">
                        ${channelProfileList}
                        ${followBtnEl}
                    </div>
                    <div class="line"></div>
                    ${channelListWrap}
                </li>`;
    }


}

export default ChannelRecommend;