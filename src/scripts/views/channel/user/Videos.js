
import {list} from '../../../utils/apis/list';
import URLS from '../../../utils/urls';
import {POPULAR, RECENTLY} from '../../../common/orderByField';
import AppendTemplete from "../../../components/AppendTemplete";
import VideoListItem from "../../../templetes/default/VideoListItem";
import ListMore from "../../common/ListMore";
import Const from "../../../common/Const";







class Videos {


    constructor() {

        this.tabItem = $('#myVideos');
        this.listBox = $('.list-box', this.tabItem);
        this.listNotthing = $('.list-nothing', this.tabItem);
        this.uid = $('.user').data('uid');
        this.option = {orderByField: RECENTLY, searchUserId: this.uid, offset: 0, size: Const.videoSize};

        this.idx = 0;
        this.init();
    }

    init(){

    }

    active(){
        new ListMore(this, this.listBox);
        this.tabItem.addClass('active');
        this.load();
    }

    deactive(){
        this.tabItem.removeClass('active');
    }

    load(){
        this.loadList(URLS.contentChannel, this.option);
    }

    loadList(url, obj){
        list(url, obj, (data) => {

            const templete = new AppendTemplete();
            templete.append({
                dataList: data.contentSearchResults,
                element: this.listBox,
                ClassItem: VideoListItem,
                listType: 'default',
                option: obj
            });

            if(data.contentSearchResults.length > 0){
                this.listNotthing.hide();
            }else{
                if(this.option.offset === 0){
                    this.listNotthing.show();
                    this.listBox.hide();
                }
            }
        });
    }


}

export default Videos;










