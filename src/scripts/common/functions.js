import Validation from "../utils/form.validation";
import URLS from "../utils/urls";
import Locale from "../utils/Locale";
import StringUtils from "../utils/StringUtils";

/*
 섬네일 파일 선택시
 */
export const fileSelectHandler = function(e) {
    e = e.originalEvent;

    e.preventDefault();

    const _this = this;

    // FileDragHover(e);
    let files = e.target.files || e.dataTransfer.files;

    if(files.length == 0){
        return;
    }

    var filename = files[0].name;

    filename = filename.replace(/\s/gi, '');
    var ext = filename.split(".").pop();
    ext = ext.toLowerCase();
    var bannedExt = "/\.(jpg|png|jpeg|gif)$/i";
    var found = bannedExt.match(ext);
    if( !found ){
        alert(Locale.prop('editprofile.image_wrong'));
        this.value = '';
        return;
    }

    if(files[0].size > 5242880){
        alert(Locale.prop('editprofile.image_over'));
        _this.value = '';
        return;
    }

    // isThumbnail = true;

    const obUrl = URL.createObjectURL(files[0]);
    const width = $(_this).data('width');
    const height = $(_this).data('height');

    const img = new Image();
    img.onload = function () {

        // if(this.width != width || this.height != height){
        //     alert('선택한 이미지 파일이 제한 사이즈를 초과해 등록 불가능 합니다. 다시 선택해 주세요.');
        //     _this.value = '';
        //     return;
        // }else{
        $(_this).trigger('changed');

            const $thumbArea = $(_this).data('thumb');
            $thumbArea.css({'background-image': `url(${obUrl})`});
        // }

    };
    img.src = obUrl;






    // $thumbArea.html('').append(`<img src="${obUrl}" alt="" />`);

};







export const contentUploadForm = function(obj, callback, disable) {

    const contentId = obj.contentId;
    const duration = obj.duration;

    let title = this.$title.val();
    let description = this.$inputDesc.val();
    const contentType = this.$contentType.filter(':checked').val();
    const checkVR = this.$vr.filter(':checked').val();
    const contentTypeId = this.$contentTypeId.filter(':checked').val();
    const files = this.$element.find('#thumbnailInputFile')[0].files;
    const publicType = this.$publicType.filter(':checked').val();





    if(Validation.chkSpace(this.$title[0], Locale.prop('upload.null_title') ))
        return;
    // if(Validation.chkSpace(this.$inputDesc[0], Locale.prop('upload.null_desc') ))
    //     return;

    if(!contentType){
        alert(Locale.prop('upload.videotype_null'));
        return;
    }
    if(checkVR !== 'Y' && checkVR !== 'N'){
        alert(Locale.prop('upload.null_vr'));
        return;
    }
    if(!contentTypeId){
        alert(Locale.prop('upload.null_type'));
        return;
    }

    let checkArr = [];

    this.$cateCode.filter(":checked").each(function() {
        checkArr.push($(this).val());
    });

    if(checkArr.length == 0 || checkArr.length > 3){
        alert(Locale.prop('upload.null_category'));
        return;
    }
    // if(files.length === 0){
    //     alert('동영상 섬네일을 1개 이상 선택해 주세요.');
    //     return;
    // }
    if(!publicType){
        alert(Locale.prop('upload.null_pubplic'));
        return;
    }

    if(this.active) return;
    this.active = true;





    title = StringUtils.removeTagReplaceLine(title);
    description = StringUtils.removeTagReplaceLine(description);



    //버튼 비활성화 한다.
    if(disable) disable.call(this);

    const url = obj.type === 'upload' ? URLS.contentNew : URLS.contentModify;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Accept", 'application/json');

    var formData = new FormData();
    formData.append('id', contentId);

    if(obj.type === 'upload'){
        formData.append('type', 'S3');
        formData.append('status', 'ENABLE');
        formData.append('adult', 'N');
        formData.append('duration', duration);
    }


    formData.append('title', title);
    formData.append('description', description);
    formData.append('contentType', contentType);
    formData.append('isVr', checkVR);
    formData.append('contentTypeId', contentTypeId);
    formData.append('categories', checkArr);
    if(files.length > 0){
        formData.append('thumbnailFile', files[0]);
    }
    formData.append('publicType', publicType);





    /*
     Form 전송 완료
     */
    xhr.onload = (e) => {

        this.active = false;
        var callStatus = e.currentTarget.status;
        if(callStatus == 200){
            callback.call(e.currentTarget);

            /**
             * reset
             */
            this.$cateCode.filter(":checked").each(function() {
                $(this).prop('checked', '');
            });


        }else if(callStatus == 500){
            var json = $.parseJSON(e.currentTarget.responseText);
            if(json.code == 902){
                alert(Locale.prop('upload.prohibited'));

            }
        }
    };
    xhr.send(formData);





};









