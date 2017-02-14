import request from "../../utils/apis/request";
import URLS from "../../utils/urls";
import {requestTemplates} from "../../utils/apis/request";
import {fileSelectHandler, contentUploadForm} from "../../common/functions";
import DefaultPopup from "../common/DefaultPopup";
import Locale from "../../utils/Locale";
import CategoryController from "../upload/CategoryController";

export default class ModifyPopup extends DefaultPopup {


    constructor(){

        super();
        this.$element = null;

        this.init();
    }

    init(){



        const diableButton = (e) => {

            //수정 완료시 호출한다.
            const callback = ()=> {
                alert(Locale.prop('editvideos.edit_complete'));
                $(e.currentTarget).removeClass('disable');
                super.hide();

                this.modifyComplate();
            };

            //submit 버튼을 비활성화한다.
            const disable = ()=> {
                $(e.currentTarget).addClass('disable');
            };

            contentUploadForm.call(this, {type: 'modify', contentId: this.cid}, callback, disable);

            e.preventDefault();
        };
        $(document).on({click: diableButton}, ' .submitBtn');


    }

    load(contentId, modifyComplate){
        this.modifyComplate = modifyComplate;

        if(this.$element){
            this.loadData(contentId);
            return;
        }

        requestTemplates(URLS.templateModifyPopup, {}, (data) => {

            $('#content').append(data);
            super.element = this.$element = $('#ModifyPopup');
            this.bindEvent(contentId);
            this.loadData(contentId);



        }, function error(data){

        }, 'GET');

    }

    bindEvent(){

        this.$title = this.$element.find('#inputTitle');
        this.$inputDesc = this.$element.find('#inputDesc');
        this.$thumbArea = this.$element.find('.thumb-area');
        this.$contentType = $('input[name=contentType]');
        this.$vr = $(`input[name=vr]`);
        this.$contentTypeId = $(`input[name=contentTypeId]`);
        this.$publicType = $(`input[name=publicType]`);
        this.$cateCode = $(`input[name=cateCode]`);

        this.$element.find('#thumbnailInputFile').data('thumb', $('.thumb-area')).bind('change', fileSelectHandler);
    }

    loadData(contentId){

        this.cid = contentId;

        request(URLS.contentOwn, `contentId=${contentId}`, (data) => {

            this.show();
            this.setElement(data);

        }, null, 'GET');
    }

    setElement(data){
        this.$title.val(data.title);
        this.$inputDesc.html(data.description);
        this.$contentType.filter(`[value=${data.contentType}]`).prop('checked', 'checked');
        this.$vr.filter(`[value=${data.isVr}]`).prop('checked', 'checked');
        this.$contentTypeId.filter(`[value="1"]`).prop('checked', 'checked');
        this.$publicType.filter(`[value=${data.publicType}]`).prop('checked', 'checked');

			this.$cateCode.prop('checked', '');
        for (const list of data.contentCategoryDtoList){
            this.$cateCode.filter(`[value=${list.id}]`).prop('checked', 'checked');
        }

        const thumbList = data.contentThumbnailDtoList;
        const thumbPath = thumbList[0].path;
        this.$thumbArea.css('background-image', `url(${thumbPath})`);

			this.$element.find('#thumbnailInputFile').val('');


        new CategoryController( this.$cateCode );

    }



}