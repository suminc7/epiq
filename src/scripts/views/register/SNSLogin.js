import request from "../../utils/apis/request";
import URLS from "../../utils/urls";
import {snsLoginKey, authKey} from "../../utils/encrypt";
import Agreement from "./Agreement";
import Locale from "../../utils/Locale";


export default class SNSLogin {
    constructor(){
        this.$loginContainer = $('.login-container');

    }


    login(result){

        if(!result.email){
            alert(Locale.prop('login.email_unable_import'));
            return;
        }

        this.snsLoginData = result;

        request(URLS.userSnsLogin, {
            email: result.email,
            deviceType: 'PC',
            snsType: result.snsType,
            salt: snsLoginKey(result.email)
        }, data => {
            // window.location = '/';
            URLS.goPagesAfterLogin();
        }, data => {
            if(data.code === 601){
                this.$loginContainer.addClass('agree');
            }
        }, 'POST');


        const agreement = new Agreement();
        agreement.init(() => {
            this.snsLoginData.isAgreeSendEmail = agreement.isEmail;
            this.snsLoginData.isAgreeAppPush = agreement.isPush;

            this.join(this.snsLoginData);

        });

    }


    join(result){

        request(URLS.userSnsJoin, {
            email: result.email,
            salt: snsLoginKey(result.email),
            nickname: result.nickname,
            deviceType: 'PC',
            snsType: result.snsType,
            isAgreeUtilization: "Y",
            isAgreePersonalInfo: "Y",
            isAgreeSendEmail: result.isAgreeSendEmail,
            isAgreeAppPush: result.isAgreeAppPush
        }, data => {
            window.location = URLS.viewjoinSNS;
        }, null, 'POST');

    }
}