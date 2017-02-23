import SNSLogin from "./SNSLogin";
import Const from "../../common/Const";

export default class FacebookLogin extends SNSLogin {
    constructor(){
        super();


        let appId = "";

        window.fbAsyncInit = function() {
            FB.init({
                appId: appId,
                cookie: true,  // enable cookies to allow the server to access
                version: 'v2.7' // use graph api version 2.5
            });
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));




        this.init();
    }

    init(){
        // super.login();

        const _this = this;
        $('.fb a').bind('click', e => {

            FB.getLoginStatus(function(response) {
                //console.log(response);
                if (response.status === 'connected') {
                    _this.getEmail();
                }
                else {
                    FB.login(function(response) {
                        //console.log(response);
                        if (response.authResponse) {
                            //console.log('Welcome!  Fetching your information.... ');
                            _this.getEmail();
                        } else {
                            //console.log('User cancelled login or did not fully authorize.');
                        }
                    }, {scope: 'public_profile, email'});
                }
            });
        });
    }

    getEmail(){

        FB.api(
            '/me',
            'GET',
            {"fields":"id,name,email"},
            (response) => {
                super.login({
                    email: response.email,
                    nickname: response.name,
                    snsType: 'FACEBOOK'
                });
            }
        );

    }
}

