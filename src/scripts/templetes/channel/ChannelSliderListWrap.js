import VideoListItem from "../default/VideoListItem";
import ChannelListItem from "../default/ChannelListItem";
import Locale from "../../utils/Locale";



export default class ChannelSliderListWrap {


    constructor(obj) {
        this.obj = obj;
    }

    list(contents){


        let contentItem = `<p class="nothing-list-txt">${Locale.prop('channel.is_null')}</p>`;
        let arrowLeft = `<a href="#" class="list-arrow-left"></a>`;
        let arrowRight = `<a href="#" class="list-arrow-right active"></a>`;

        if(contents.length > 0){
            contentItem = '';

        }else{
            arrowLeft = '';
            arrowRight = '';
        }

        if(contents.length < 4){
            arrowLeft = '';
            arrowRight = '';
        }

        if(this.obj.listType === 'userChannel'){
            for (let content of contents) {
                contentItem += new ChannelListItem({listType: this.obj.listType}).list(content);
            }
        }else{
            for (let content of contents) {
                contentItem += new VideoListItem({listType: this.obj.listType}).list(content);
            }
        }



        const el = `<div class="list-wrap">
                        ${arrowLeft}
                        <div class="list-inner">
                            <ul class="list-body">
                               ${contentItem}
                            </ul>
                        </div>
                        ${arrowRight}
                    </div>`;
        return el;
    }


}
