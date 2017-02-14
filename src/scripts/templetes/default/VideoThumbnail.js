import {getDuration} from '../../utils/date';
import Checkbox from "../mypage/Checkbox";



export default class VideoThumbnail {
    constructor(obj) {
        this.obj = obj;
    }

    list(videoItem) {

        let {
            contentThumbnailDtoList: thumb,
            duration,
            contentId,
            contentType,
            contentCategoryDtoList: categoryList
        } = videoItem;


        const path = thumb.length > 0 ? thumb[0].path : '';

        duration = getDuration(duration);

        let checkbox = '';
        if(this.obj.listType === 'mypage') {
            checkbox = new Checkbox().list(contentId);
        }


        const newCateList = categoryList.filter(x => x.name == 'UCC');
        const uccIcon = newCateList.length > 0 ? '<span class="icon-ucc">UCC</span>' : '';



        var contentTypeIcon = '';
        if(contentType === 'FREE_PREMIUM'){
            contentTypeIcon = '<span class="icon-premium">PREMIUM</span>';
        }else if(contentType === 'VR_STAR'){
            contentTypeIcon = '<span class="icon-vrstar">STAR</span>';
        }

        const iconWrap = `<span class="icon-wrap">${contentTypeIcon}${uccIcon}</span>`;

        return `<div class="video-thumb" style="background-image: url(${path})">
                    ${iconWrap}
                    <a href="/content/view?contentId=${contentId}"></a>
                    ${checkbox}
                    <div class="duration">${duration}</div>
                </div>`

    }
}