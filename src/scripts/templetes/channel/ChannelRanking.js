import ChannelProfile from "./ChannelProfile";
import RankArea from "./RankArea";
import FollowButton from "../../components/FollowButton";

export default class ChannelFollowing {


    constructor(obj) {
        this.obj = obj;
    }

    list(listItem, count){

        const {
            isFollow,
            userId
        } = listItem;


        const channelProfileList = new ChannelProfile(this.obj).list(listItem);
        const rankArea = new RankArea(this.obj).list(listItem, count);

        const followBtn = new FollowButton();
        const followBtnEl = followBtn.createElement(isFollow, userId);

        const el = `<li class="ranking-list">
                        ${rankArea}
                        ${channelProfileList}
                        ${followBtnEl}
                    </li>`;
        return el;
    }


}