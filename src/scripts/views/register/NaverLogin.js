import SNSLogin from "./SNSLogin";
import Const from "../../common/Const";

export default class NaverLogin extends SNSLogin {
    constructor(){
        super();

        this.init();



        var naver = null;
        const href = window.location.href;
        const callbackUrl = window.location.origin + '/user/callback';
        if(href.indexOf('iptime.org') > 0){
            naver = new window.naver_id_login('D1yedquVAPPxHP3TJ2U9', callbackUrl);
        }else if(href.indexOf('ing.'+Const.domain) > 0){
            naver = new window.naver_id_login('v1GBgIDTeNgg93Z8cRd5', callbackUrl);
        }else if(href.indexOf(Const.domain) > 0){
            naver = new window.naver_id_login('Gsg5WyOWDlU7Ju4sRBnM', callbackUrl);
        }else{
            naver = new window.naver_id_login('Gsg5WyOWDlU7Ju4sRBnM', callbackUrl);
        }

        var state = naver.getUniqState();
        // naver.setButton("white", 2,40);
        naver.setDomain(Const.domain);
        naver.setState(state);
        naver.setPopup();
        naver.init_naver_id_login();

        window.naverSignInCallback = (data) => {

            const result = {
                email: naver.getProfileData('email'),
                nickname: naver.getProfileData('nickname'),
                snsType: 'NAVER',
            };

            super.login(result);


        };


        window.naverLogedin = function(hash){
            window.location.hash = hash;
            naver.init_naver_id_login_callback();
            naver.get_naver_userprofile("naverSignInCallback()");
        };

    }

    init(){



        $('.naver a').bind('click', e => {
            const url = $('#naver_id_login a').attr('href');
            window.open(url, 'naverloginpop', 'titlebar=1, resizable=1, scrollbars=yes, width=600, height=550');
        });


    }

    login(){

    }
}
