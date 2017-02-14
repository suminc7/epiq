import {} from '../common/global';
import request from '../utils/apis/request';
import Validation from '../utils/form.validation';
import encrypt from '../utils/encrypt';
import URLS from '../utils/urls';
import FacebookLogin from "./register/FacebookLogin";
import NaverLogin from "./register/NaverLogin";
import Locale from "../utils/Locale";




const $loginForm = $( "#loginForm" ),
inputEmail = document.getElementById('InputEmail'),
inputPassword = document.getElementById('inputPassword');



Validation.isFocusError = true;


export default class Login {
    constructor(){

        this.naverLogin = new NaverLogin();
        this.facebookLogin = new FacebookLogin();

        this.init();

    }

    init(){


        $loginForm.submit(function( event ) {
            event.preventDefault();


            if(Validation.checkEmail(inputEmail)) return;
            if(Validation.checkPassword(inputPassword)) return;


            const isKeepLogin = $('#loginStatus').prop('checked') ? 'Y' : 'N';
            const password = encrypt(this.password.value);

            request(URLS.login, {
                email: this.email.value,
                password,
                deviceType: 'PC',
                isKeepLogin
            }, function(data){
                if(data.pastChangedPwd === "Y"){
                    window.location = URLS.viewUserPwdChange;
                }else{
                    URLS.goPagesAfterLogin();
                }

            }, function error(data){
                if(data.code === 601){
                    Validation.focusError(inputEmail, Locale.prop('login.alert_incorrect_email_password'));
                }else if(data.code === 622){
                    window.location = URLS.viewDoEmailAuth;
                }
            }, 'POST');

        });
    }





}

new Login();










