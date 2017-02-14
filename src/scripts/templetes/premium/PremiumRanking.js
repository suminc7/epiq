import VideoThumbnail from "../default/VideoThumbnail";
import VideoMeta from "../default/VideoMeta";
import Modify from "../mypage/Modify";
import RankArea from "../channel/RankArea";
import StringUtils from "../../utils/StringUtils";
import ListItemProxy from "../../utils/ListItemProxy";



export default class PremiumRanking {


    constructor(obj) {
        this.obj = obj;
    }

    list(listItem, count){



        let {
            title,
            contentCategoryDtoList,
            userProfileDtoList
        } = listItem;


        const videoThumb = new VideoThumbnail(this.obj).list(listItem);
        const videoMeta = new VideoMeta(this.obj).list(listItem);
        const rankArea = new RankArea(this.obj).list(listItem, count);
        // const category = contentCategoryDtoList[0];
        const category = ListItemProxy.getLocaleString(contentCategoryDtoList[0], 'name');




        title = StringUtils.titleSubstring(title, 50);
        const profilePath = ListItemProxy.getProfile(userProfileDtoList);


        // list more 후에 추가되는 부분
        //let modify = '';
        // if(this.obj.listType === 'mypage') {
        //     modify = new Modify().list();
        // }
    // <div class="video-more">
    //         <a href="#"></a>
    //         ${modify}
    //         </div>


        const el = `<li class="ranking-list">
                        ${rankArea}
                        ${videoThumb}
                        <div class="video-info">
                            <div class="video-category">${category}</div>
                            <div class="video-content">
                                <div class="video-title">${title}</div>
                                <div class="user-thumb">
                                    <a href="#"${profilePath}></a>
                                </div>
                                ${videoMeta}
                            </div>
                        </div>
                    </li>`;
        return el;
    }


}

