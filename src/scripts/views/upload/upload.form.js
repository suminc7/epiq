import {fileSelectHandler, contentUploadForm} from '../../common/functions';
import Locale from "../../utils/Locale";
import CategoryController from "./CategoryController";



const completeVideoListener = (obj) => {
    contentId = obj.id;
    isUploaded = true;
};
const completeS3Listener = (obj) => {
    contentId = obj.id;
    isUploadedS3 = true;
};
const videoInitListener = (obj) => {
    duration = obj.duration;
};
const complateEncodingListener = () => {
    isEncoding = true;
    $uploadForm.find('button[type=submit]').removeClass('btn-def-white').addClass('btn-def-black').addClass('active');
};

const setEmitter = (emitter) => {
    emitter.on('upload:complateEncoding', complateEncodingListener);
    emitter.on('upload:completeVideo', completeVideoListener);
    emitter.on('upload:completeS3', completeS3Listener);
    emitter.on('video:init', videoInitListener);
};


const $uploadForm = $('#uploadForm');
const inputTitle = document.getElementById('inputTitle');
const inputDesc = document.getElementById('inputDesc');
const $uploadContainer = $('.upload-container');
const $stepLists = $('.steps li');
const $cancelBtn = $('.cancel');

let isUploaded = false;
let isUploadedS3 = false;
let isEncoding = false;
let contentId = null;
let duration = 0;


$cancelBtn.bind('click', e => {
    if(confirm(Locale.prop('upload.warning'))){
        location.reload();
    }
    e.preventDefault();
});



new CategoryController($(`input[name=cateCode]`));


/*
    등록버튼 클릭시
 */
$uploadForm.submit(function( e ) {
    e.preventDefault();



    if(!isEncoding){
        return;
    }
    if(!isUploadedS3){
        return;
    }

    // if($(e.currentTarget).hasClass('active')) return;
    // $(e.currentTarget).addClass('active');

    this.$element = $uploadForm;

    this.$title = this.$element.find('#inputTitle');
    this.$inputDesc = this.$element.find('#inputDesc');
    this.$thumbArea = this.$element.find('.thumb-area');
    this.$contentType = $('input[name=contentType]');
    this.$vr = $(`input[name=vr]`);
    this.$contentTypeId = $(`input[name=contentTypeId]`);
    this.$publicType = $(`input[name=publicType]`);
    this.$cateCode = $(`input[name=cateCode]`);


    function callback(){
        var callStatus = this.status;
        //console.log("callStatus = "+callStatus);
        if(callStatus == 200){
            var json = $.parseJSON(this.responseText);

            if(json.message === 'SUCCESS'){
                $uploadContainer.removeClass('step2');
                $uploadContainer.addClass('step3');
                $stepLists.eq(1).addClass('active');
                $stepLists.eq(2).addClass('active');
                $uploadForm[0].reset();

                $('.view-btn').attr('href', `/content/view?contentId=${json.id}`);
            }


        }
    }

    contentUploadForm.call(this, {type: 'upload', contentId, duration}, callback);


});


$('#thumbnailInputFile').data('thumb', $('.thumb-area')).bind('change', fileSelectHandler);



// document.getElementById('thumbnailInputFile').addEventListener("change", fileSelectHandler, false);


export {setEmitter}