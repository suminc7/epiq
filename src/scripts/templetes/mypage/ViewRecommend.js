import VideoMeta from "../default/VideoMeta";
import VideoThumbnail from "../default/VideoThumbnail";
import StringUtils from "../../utils/StringUtils";


class ViewRecommend {


    constructor(obj) {
        this.obj = obj;
    }

    list(videoItem){

        let {
            title,
            contentId
        } = videoItem;

        title = StringUtils.titleSubstring(title, 40);

        const videoThumb = new VideoThumbnail(this.obj).list(videoItem);
        const videoMeta = new VideoMeta(this.obj).list(videoItem);

        const el = `
        <div class="list-item">
            ${videoThumb}
            <div class="video-info"> 
                <div class="video-content">
                    <div class="video-title"><a href="/content/view?contentId=${contentId}">${title}</a></div>
                    ${videoMeta}
                </div>
                <div class="more">
                    <a href="#"></a>
                </div>
            </div>
        </div>`;

        return el;
    }


}

export default ViewRecommend;