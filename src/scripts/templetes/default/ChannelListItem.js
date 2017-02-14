import VideoMeta from "./VideoMeta";

export default class ChannelListItem {

    constructor(obj) {
        this.obj = obj;

        this.init();
    }

    static init(){


        //console.log(document);
        $(document).on({
            click: e => {
                const userId = $(e.currentTarget).data('uid');
                window.location = `/channel/user?userId=${userId}`;
            }
        }, '.channel-list-item');

    }


    init(){



    }

    list(listItem){

        let {
            userId,
            nickname,
            userBackgroundDtoList: backList,
            userProfileDtoList: profileList
        } = listItem;

        const profileImage = profileList.length > 0 ? ` style="background-image: url(${profileList[0].profilePath})"` : '';
        const backImage = backList.length > 0 ? ` style="background-image: url(${backList[0].backgroundPath});"` : '';
        const videoMeta = new VideoMeta(this.obj).list(listItem);
        const channelTag = `<span class="channel">${nickname}</span>`;

        const el = `
        <li class="list-item channel-list-item" data-uid="${userId}">
            <div class="background-area"${backImage}></div>
            <div class="profile-image"${profileImage}></div>
            <div class="channel">${channelTag}</div>
            ${videoMeta}
        </li>`;

        return el;

    }




}


ChannelListItem.init();