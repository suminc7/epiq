import contentProgress from '../../utils/apis/upload';
import URLS from '../../utils/urls';
import Locale from "../../utils/Locale";



const setEmitter = (emitter) => {
    emi = emitter;
};

const $uploadContainer = $('.upload-container');
const $dropBox = $('.dragbox');
const $uploadForm = $('#uploadForm');
const $progress = $('.progress');
const $progressBar = $('.progress .progress-bar');
const $progressBarInner = $progress.find('.sr-only');
const $stepLists = $('.steps li');
const $document = $(document);
const $progressMessageContainer = $('.progress-message');
const $progressMessage = $('.progress-message .message');
const $progressLoading = $('.progress-message .loading');

let obUrl;
let emi;
let isUploadedS3 = false;
let videoWidth = 0;
let videoHeight = 0;
let duration = 0;

$dropBox.on('dragenter', function (e){
    e.stopPropagation();
    e.preventDefault();
    $dropBox.addClass('active');
});

$dropBox.on('dragover', function (e){
    e.stopPropagation();
    e.preventDefault();
});

$document.on('dragenter', function (e){
    e.stopPropagation();
    e.preventDefault();
    $dropBox.removeClass('active');
});

$document.on('dragover', function (e){
    e.stopPropagation();
    e.preventDefault();
    $dropBox.removeClass('active');
});

$document.on('drop', function (e){
    e.stopPropagation();
    e.preventDefault();
});

$dropBox.on('drop', function (e) {
    e.stopPropagation();
    e.preventDefault();
    fileSelectHandler(e.originalEvent);
});



const videoCanPlayHandler = function(e){
    duration = Math.round(e.currentTarget.duration);



    URL.revokeObjectURL(obUrl);

    emi.trigger('video:init', {duration});

    videoWidth = e.currentTarget.videoWidth;
    videoHeight = e.currentTarget.videoHeight;
};


/**
 * 영상 업로드 진행중
 * @param files
 */
const uploadVideoHandler = function(files){


    var xhr = new XMLHttpRequest();
    xhr.open("POST", URLS.videoUploadURL, true);

    var formData = new FormData();
    formData.append('width', videoWidth);
    formData.append('height', videoHeight);
    formData.append('videoPeriod', duration);
    for (var i = 0; i < files.length ; i++) {
        formData.append('videoFile', files[i]);
    }

    /*
    영상업로드 20프로 까지만
     */

    let videoProgress = 20;
    xhr.upload.addEventListener("progress", updateProgress);
    function updateProgress (oEvent) {
        if (oEvent.lengthComputable) {
            const percentComplete = Math.floor(oEvent.loaded / oEvent.total * videoProgress);
            const percentStr = `${percentComplete}%`;
            updateProgressBar(percentStr);

            if(percentComplete == videoProgress){

            }
        } else {

        }
    }

    /*
    영상 업로드 완료
     */
    xhr.upload.onload = function(e) {

        var callStatus = this.status;
        //console.log("callStatus = "+callStatus);
        if(callStatus == 200){
            var json = $.parseJSON(this.responseText);
            var id = json["id"];
            //console.log(id);
        }
    };

    const s3VideoProgress = 40;
    xhr.onload = function(e) {

        var callStatus = this.status;

        if(callStatus == 200){
            var json = $.parseJSON(this.responseText);
            var returnUrl = json["returnUrl"];
            var id = json["id"];
            //console.log("id:"+id);

            emi.trigger('upload:completeVideo', {id});

            /*
                s3 upload progress
             */
            let interval;
            function callback(data){

                //percentStr는 20%에서 100%까지
                const progress = parseInt(data.progress);
                const percentStr = `${videoProgress + Math.floor(progress / 100 * s3VideoProgress)}%`;
                updateProgressBar(percentStr);

                if(percentStr === '95%'){
                    $progressMessage.html(Locale.prop('upload.progress_message2'));
                }

                // data.progress가 100이면 s3 업로드 완료
                if(data.progress === 100){
                    // clearInterval(interval);
                    emi.trigger('upload:completeS3', {id});
                    isUploadedS3 = true;

                    //data.uploadStatus는 인코딩 채크
                    if(data.uploadStatus === 'ENCODING_COMPLETE') {
                        updateProgressBar('100%');
                        clearInterval(interval);
                        emi.trigger('upload:complateEncoding');
                        updateProgressBar('100%');

                        TweenMax.to($progressMessageContainer, 0, {autoAlpha:0});
                        $progressBar.addClass('stop-animate');
                    }else{
                        // videoProgress 0 to 60
                        if(videoProgress + 5 < 60){
                            videoProgress += 5;

                        }
                    }
                }




            }

            interval = setInterval(function(){
                contentProgress(id, callback);
            }, 1000);



        }
    };

    xhr.send(formData);
};

const updateProgressBar = (per) => {
    $progressBar.width(per);
    $progressBarInner.html(per);

};


/**
 * 영상 파일 선택시
 * @param e
 */
const fileSelectHandler = function(e) {


    var files = e.target.files || e.dataTransfer.files;
    var filename = files[0].name;

    filename = filename.replace(/\s/gi, '');
    var ext = filename.split(".").pop();
    ext = ext.toLowerCase();
    var bannedExt = "/\.(mp4)$/i";
    var found = bannedExt.match(ext);
    if( !found ){
        alert(Locale.prop('upload.mp4'));
        this.value = '';
        return;
    }

    // if(files[0].size > 1073741824){
    //     alert(Locale.prop('upload.choose_oversize'));
    //     this.value = '';
    //     return;
    // }

    obUrl = URL.createObjectURL(files[0]);
    document.getElementById('tempVideo').setAttribute('src', obUrl);

    $uploadContainer.removeClass('step1');
    $uploadContainer.addClass('step2');
    $stepLists.eq(0).addClass('active');
    $stepLists.eq(1).addClass('on');

    $progressMessage.html(Locale.prop('upload.progress_message'));
    $progressBar.addClass('animate');

    setTimeout(function(){
        uploadVideoHandler(files);
    }, 1000);
};
document.getElementById("tempVideo").addEventListener("canplaythrough", videoCanPlayHandler);
document.getElementById('videoFileInput').addEventListener("change", fileSelectHandler, false);


const loadingArr = ['', '.', '..'];
let loadingCount = 0;
setInterval(function(){
    $progressLoading.html(loadingArr[loadingCount]);
    loadingCount++;
    if(loadingCount == 3){
        loadingCount = 0;
    }
}, 500);







export {setEmitter}