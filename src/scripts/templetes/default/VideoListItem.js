import Modify from "../mypage/Modify";
import VideoThumbnail from "./VideoThumbnail";
import VideoMeta from "./VideoMeta";
import StringUtils from "../../utils/StringUtils";

export default class VideoListItem {

    constructor(obj) {
        this.obj = obj;

        this.init();
    }

    init(){
    }

    list(videoItem){

        let {
            title,
            contentId,
            publicType
        } = videoItem;


        title = StringUtils.titleSubstring(title, 22);



        let modify = '';
        let videoMore = '';
        if(this.obj.listType === 'mypage') {
            modify = new Modify().list(contentId);


            videoMore = `<div class="video-more">
                            <a href="#"></a>
                            ${modify}
                        </div>`;
        }

        let privateClass = '';
        if(publicType === 'PRIVATE'){
            privateClass = ` class="lock"`;
        }


        const videoThumb = new VideoThumbnail(this.obj).list(videoItem);
        const videoMeta = new VideoMeta(this.obj).list(videoItem);


        const el = `
        <li class="list-item" data-cid="${contentId}">
            ${videoThumb}
            <div class="video-info">
                <div class="video-content">
                    <div class="video-title"><a${privateClass} href="/content/view?contentId=${contentId}">${title}</a></div>
                    ${videoMeta}
                </div>
                ${videoMore}
            </div>
        </li>`;

        return el;

    }




}