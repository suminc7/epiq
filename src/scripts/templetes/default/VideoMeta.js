import {getTimeago} from '../../utils/date';
import StringUtils from "../../utils/StringUtils";
import Const from "../../common/Const";
import NumberUtils from "../../utils/NumberUtils";
import FollowButton from "../../components/FollowButton";



export default class VideoMeta {
    constructor(obj = {listType: 'default'}) {
        this.obj = obj;
    }

    list(videoItem) {

        let {
            likeCount,
            channel,
            dateCreated,
            userId,
            totalPublicContent,
            totalLike,
            viewCount,
            isFollow
        } = videoItem; //userDto



        viewCount = NumberUtils.getCount(viewCount);
        totalLike = NumberUtils.getCount(totalLike);
        likeCount = NumberUtils.getCount(likeCount);


        let channelTag = ``;
        let timeTag = ``;
        let videoNumTag = ``;
        let viewTag = ``;
        let followBtnTag = ``;
        let likeNum = 0;


        /**
         * userChannel은 채널 리스트에서 사용한다.
         */
        if(this.obj.listType === 'userChannel') {
            channelTag = '';
            videoNumTag = `<span class="total-videos"><span class="video-num">${totalPublicContent}</span></span>`;
            dateCreated = '';
            timeTag = '';
            likeNum = totalLike;
        }else{

            // 채널>추천, 프리미엄>채널에선 채널명 삭제
            if(this.obj.listType === 'channel' || this.obj.listType === 'premium'){
                channelTag = ``;
            }else{
                channel = StringUtils.titleSubstring(channel, Const.channelSubstringLen);
                channelTag = `<a href="/channel/user?userId=${userId}" class="channel">${channel}</a>`;
            }



            videoNumTag = '';
            dateCreated = getTimeago(dateCreated);
            timeTag = `<span class="time"><span class="timeago">${dateCreated}</span></span>`;
            viewTag = `<span class="viewcount">${viewCount}</span>`;
            likeNum = likeCount;
        }

        if(this.obj.listType === 'view'){
            const followBtn = new FollowButton();
            followBtnTag = followBtn.createElement(isFollow, userId);
            followBtnTag += '<br>';
        }





        return `<div class="content-meta">
                    ${channelTag}
                    ${followBtnTag}
                    ${videoNumTag}
                    ${timeTag}
                    ${viewTag}
                    <span class="like">
                        <span class="likecount">${likeNum}</span>
                    </span>
                </div>`

    }
}