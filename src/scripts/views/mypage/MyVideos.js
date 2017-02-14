import {list} from '../../utils/apis/list';
import URLS from '../../utils/urls';
import request from '../../utils/apis/request';
import {POPULAR, RECENTLY} from '../../common/orderByField';
import AppendTemplete from "../../components/AppendTemplete";
import VideoListItem from "../../templetes/default/VideoListItem";
import ListMore from "../common/ListMore";
import ModifyPopup from "./ModifyPopup";
import Locale from "../../utils/Locale";
import Const from "../../common/Const";
import ListControlButton from "../../components/ListControlButton";


/*
 전체선택
 */
let isCheck = false;



class MyVideos {


    constructor(url, listType) {
        this.url = url;
        this.listType = listType;

        this.tabItem = $('#myVideos');
        this.deleteBtn = $('.delete-control .delete-btn', this.tabItem);
        this.listBox = $('.list-box', this.tabItem);
        this.listNotthing = $('.list-nothing', this.tabItem);
        this.sortBtn = $('.list-control .right-control a', this.tabItem);

        this.option = {orderByField: RECENTLY, offset: 0, size: Const.videoSize};
        this.uid = $('.user').data('uid');
        if(this.uid > 0){
            this.option.searchUserId = this.uid;
        }

        this.pid = RECENTLY.toLowerCase();
        this.init();
    }

    init(){

        new ListControlButton(this);

        const $selectAllBtn = $('.delete-control .checkbox', this.tabItem);

        $selectAllBtn.bind('click', () => {
            $('.checkbox input[type=checkbox]').prop("checked", isCheck = !isCheck);

            if(isCheck){
                this.deleteBtn.removeClass('disable');
            }else{
                this.deleteBtn.addClass('disable');
            }
            // $listBox.find('.checkbox checkbox').trigger('click');
        });

        this.deleteBtn.bind('click', e => {

            const arr = this.checkedDeleteList();
            if(arr.length == 0){
                alert(Locale.prop('editvideos.select_video'));
                return;
            }

            if(confirm(Locale.prop('editvideos.delete'))){
                this.deleteList();
            }
            e.preventDefault();
        });



        $(document).on({
            click: () => {
                const arr = this.checkedDeleteList();
                if(arr.length > 0){
                    this.deleteBtn.removeClass('disable');
                }else{
                    this.deleteBtn.addClass('disable');
                    $('.checkbox input[type=checkbox]').prop("checked", isCheck = false);
                }
            }
        }, '.list-item .checkbox');




        var modifyPopup = new ModifyPopup();

        // 수정하기 완료시
        const modifyComplate = () => {
            this.load();
        };

        // 수정하기 버튼 클릭
        $(document).on({
            click: e => {
                const $btn = $(e.currentTarget);
                $btn.addClass('disable');
                const contentId = $btn.parent().parent().data('cid');
                modifyPopup.load(contentId, modifyComplate);
                e.preventDefault();

                setTimeout(()=> $btn.removeClass('disable'), 500);
            }
        }, '.modify .list-1 a');

        // 삭제하기 버튼 클릭
        $(document).on({
            click: e => {
                if(confirm(Locale.prop('editvideos.delete'))){
                    const $btn = $(e.currentTarget);
                    $btn.addClass('disable');
                    const contentId = $btn.parent().parent().data('cid');
                    this.deleteItem(contentId, $btn, contentId);
                }
                e.preventDefault();
            }
        }, '.modify .list-2 a');

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
        this.loadList(this.url, this.option);
    }

    loadList(url, obj){
        list(url, obj, (data) => {
            const templete = new AppendTemplete();
            templete.append({
                dataList: data.contentSearchResults,
                element: this.listBox,
                ClassItem: VideoListItem,
                listType: this.listType,
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

    deleteList(){
        const arr = this.checkedDeleteList();

        this.deleteItem(arr);
    }

    deleteItem(value, $btn, contentId){
        request(URLS.contentDelete, 'contentIds='+value, () => {
            this.removeElement(contentId);
            if($btn){
                $btn.removeClass('disable');
            }
        });
    }

    removeElement(contentId){
        const _this = this;

        //삭제하기 메뉴에서 삭제시
        if(contentId > 0){
            this.listBox.find(`.list-item[data-cid=${contentId}]`).remove();
            if(this.listBox.find(`.list-item`).length == 0){
                this.listNotthing.show();
                this.listBox.hide();
            }
            return;
        }

        //선택삭제로 삭제시
        this.listBox.find('.checkbox input[type=checkbox]:checked').each(function(){
            $(this).parents('.list-item').remove();
            _this.deleteBtn.addClass('disable');
        });
    }

    /**
     * 체크된 컨텐츠의 배열을 반환한다.
     * @returns {Array}
     */
    checkedDeleteList(){
        const arr = [];
        this.listBox.find('.checkbox input[type=checkbox]:checked').each(function(){
            arr.push($(this).parents('.list-item').data('cid'));
        });
        return arr;
    }


}

export default MyVideos;










