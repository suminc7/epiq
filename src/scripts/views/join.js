import {} from '../common/global';
import Validation from '../utils/form.validation';
import encrypt, {snsLoginKey} from '../utils/encrypt';
import Agreement from "./register/Agreement";
import URLS from "../utils/urls";
import request from "../utils/apis/request";

const $joinForm = $('#joinForm'),
    $container = $('.join-container'),
    $checkNickname = $('#checkNickname'),
    $checkEmail = $('#checkEmail'),
    inputChannel = document.getElementById('InputChannel'),
    inputEmail = document.getElementById('InputEmail'),
    inputPassword = document.getElementById('inputPassword'),
    inputPasswordConfirm = document.getElementById('inputPasswordConfirm');

Validation.isFocusError = true;


const agreement = new Agreement();
agreement.init(function submit(){
    $container.addClass('agree');
});


$joinForm[0].reset();
$joinForm.submit(function( event ) {
    event.preventDefault();


    if(Validation.checkInputNicknameInSubmit(inputChannel)){
        return;
    }
    if(Validation.checkInputEmailInSubmit(inputEmail)){
        return;
    }

    if(Validation.checkNickname(inputChannel)) return;
    if(Validation.checkEmail(inputEmail)) return;
    if(Validation.checkJoinPassword(inputPassword)) return;
    if(Validation.checkJoinConfirmPassword(inputPassword, inputPasswordConfirm)) return;


    $('button[type=submit]').addClass('disable');



    request(URLS.joinURL, {
        email: this.email.value,
        salt: snsLoginKey(this.email.value),
        password: encrypt(this.password.value),
        language: epiq.lang,
        locale: epiq.lang, // todo : 처음엔 대문자라 질문 필요
        nickname: this.nickname.value,
        snsType: 'MERCURY',
        userType: 'NORMAL',
        isAgreeUtilization: 'Y',
        isAgreePersonalInfo: 'Y',
        isAgreeSendEmail: agreement.isEmail,
        isAgreeAppPush: agreement.isPush
    }, function(data){
        if(data.message === 'SUCCESS'){
            window.location = URLS.viewEmailAuth;
        }

    }, null, 'POST');



});

/**
 * channel 중복확인
 */
function callbackChannel(){
    Validation.checkNicknameValue = inputChannel.value;
    $checkNickname.addClass('disable');
}
callbackChannel();


$(inputChannel).on('keyup change blur', function(){
    if(Validation.checkNicknameValue != $(this).val()){
        $checkNickname.removeClass('disable');
    }else{
        $checkNickname.addClass('disable');
    }
});


/**
 * email 중복확인
 */
function callbackEmail(){
    Validation.checkEmailValue = inputEmail.value;
    $checkEmail.addClass('disable');
}
callbackEmail();

$(inputEmail).on('keyup change blur', function(){
    if(Validation.checkEmailValue != $(this).val()){
        $checkEmail.removeClass('disable');
    }else{
        $checkEmail.addClass('disable');
    }
});


$checkNickname.bind('click', ()=> Validation.checkInputNickname(inputChannel, callbackChannel));
$checkEmail.bind('click',() => Validation.checInputEmail(inputEmail, callbackEmail));




