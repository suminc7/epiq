import {fileSelectHandler} from '../../common/functions';
import Validation from "../../utils/form.validation";
import URLS from "../../utils/urls";
import StringUtils from "../../utils/StringUtils";
import Locale from "../../utils/Locale";

export default class ViewProfile {


    constructor() {


        this.$checkNickBtn = $('#checkNickname');
        this.$inputNick = $('#inputChannel');
        this.$profileInput = $('.image-inputfile:eq(0)');
        this.$backInput = $('.image-inputfile:eq(1)');
        this.$myProfileArea = $('.profile_area');
        this.$myBackArea = $('.back_area');
        this.$deleteProfileBtn = $('#deleteProfileBtn');
        this.$deleteBackBtn = $('#deleteBackBtn');


        Validation.checkNicknameValue = this.$inputNick.val();


        this.init();
        this.initSubmit();
    }

    init() {
        $('.default-list-tab a[data-pid=profile]').addClass('active');

        this.$profileInput.data({
            'thumb': this.$myProfileArea,
            'width': 120,
            'height': 120
        }).bind('change', fileSelectHandler);

        this.$profileInput.bind('changed', ()=> {
            this.$deleteProfileBtn.removeClass('disable');
        });

        this.$backInput.data({
            'thumb': this.$myBackArea,
            'width': 1420,
            'height': 260
        }).bind('change', fileSelectHandler);

        this.$backInput.bind('changed', ()=> {
            this.$deleteBackBtn.removeClass('disable');
        });

        /**
         * 프로필 경로에 default가 있으면 버튼 비활성화
         */
        if(this.$myProfileArea.attr('style').indexOf('/default_profile/') > 0){
            this.$deleteProfileBtn.addClass('disable');
        }
        if(this.$myBackArea.attr('style').indexOf('/default_background/') > 0){
            this.$deleteBackBtn.addClass('disable');
        }


        /**
         * 중복확인 버튼
         */
        const _this = this;
        function callback(){
            Validation.checkNicknameValue = _this.$inputNick.val();
            _this.$checkNickBtn.addClass('disable');
        }
        callback();

        $('#checkNickname').bind('click', ()=> {
            Validation.checkInputNickname(this.$inputNick[0], callback);
        });

        this.$inputNick.on('keyup blur', function(){
            if(Validation.checkNicknameValue != $(this).val()){
                _this.$checkNickBtn.removeClass('disable');
            }else{
                _this.$checkNickBtn.addClass('disable');
            }
        });


        /**
         * 섬네일 삭제 버튼
         */
        this.$deleteProfileBtn.bind('click',(e) => {
            e.preventDefault();
            if($(e.currentTarget).hasClass('disable'))return;
            $(e.currentTarget).addClass('disable');

            this.$myProfileArea.css('background-image', `url(${this.$myProfileArea.data('default-image')})`);
            this.isDelProfile = "Y";

        });

        this.$deleteBackBtn.bind('click',(e) => {
            e.preventDefault();
            if($(e.currentTarget).hasClass('disable'))return;
            $(e.currentTarget).addClass('disable');

            this.$myBackArea.css('background-image', `url(${this.$myBackArea.data('default-image')})`);
            this.isDelBackground = "Y";
        });
    }

    initSubmit(){

        $('#cancelBtn').bind('click', (e) => {
            e.preventDefault();
            if(confirm(Locale.prop('editprofile.warning'))){
                window.location = '/channel/my';
            }

        });


        $('#submitBtn').bind('click', (e) => {
            e.preventDefault();



            if(Validation.checkInputNicknameInSubmit(this.$inputNick[0])){
                return;
            }


            const nick = StringUtils.removeTagReplaceLine( this.$inputNick.val() );
            const greeting = StringUtils.removeTagReplaceLine( $('#inputDesc').val() );

            const profileFiles = this.$profileInput[0].files;
            const backFiles = this.$backInput[0].files;
            const isPublicFollow = $('#Follower').find('option:selected').val();
            const isPublicFollowing = $('#Following').find('option:selected').val();
            const checkboxEmail = $('#Email').is(':checked') ? 'Y': 'N';
            const checkboxApp = $('#AppPush').is(':checked') ? 'Y': 'N';
            const checkboxAppNight = $('#AppPushNight').is(':checked') ? 'Y': 'N';


            if($(e.currentTarget).hasClass('disable')){
                return;
            }
            $(e.currentTarget).addClass('disable');


            var xhr = new XMLHttpRequest();
            xhr.open("POST", URLS.modifyUserInfo, true);
            xhr.setRequestHeader("Accept", 'application/json');

            var formData = new FormData();
            formData.append('nickname', nick);
            formData.append('greeting', greeting);

            if(profileFiles.length > 0){
                formData.append('profileFile', profileFiles[0]);
                formData.append('profileWidth', 120);
                formData.append('profileHeight', 120);
            }

            if(backFiles.length > 0){
                formData.append('backgroundFile', backFiles[0]);
                formData.append('backgroundWidth', 1420);
                formData.append('backgroundHeight', 260);
            }


            formData.append('isPublicFollow', isPublicFollow);
            formData.append('isPublicFollowing', isPublicFollowing);

            formData.append('isAgreeSendEmail', checkboxEmail);
            formData.append('isAgreeAppPush', checkboxApp);
            formData.append('isAgreeNineteenToEightPush', checkboxAppNight);


            if(this.isDelProfile === "Y"){
                formData.append('isDelProfile', "Y");
            }

            if(this.isDelBackground === "Y"){
                formData.append('isDelBackground', "Y");
            }


            /*
             Form 전송 완료
             */
            xhr.onload = function(e) {

                var callStatus = e.currentTarget.status;
                var json;
                if(callStatus == 200){
                    json = $.parseJSON(e.currentTarget.responseText);
                    if(json.message === 'SUCCESS'){
                        alert(Locale.prop('editprofile.done'));
                        window.location = URLS.viewMypage;
                    }
                }else if(callStatus == 500){
                    json = $.parseJSON(e.currentTarget.responseText);
                    if(json.code == 902){
                        alert(Locale.prop('editprofile.confirm_prohibited'));

                    }
                }
            };
            xhr.send(formData);


        });
    }
}