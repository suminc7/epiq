import ChannelProfile from "./ChannelProfile";
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
        const followBtn = new FollowButton();
        const followBtnEl = followBtn.createElement(isFollow, userId);

        let even = count % 2 == 1 ? ' even' : '';

        const el = `<li class="following-list${even} cb">
                    ${channelProfileList}
                    ${followBtnEl}
                    </li>`;

        return el;
    }


}