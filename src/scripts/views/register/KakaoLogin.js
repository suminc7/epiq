

export default class KakaoLogin {
    constructor(){
        this.init();
    }

    init(){

        Kakao.init('4747bbb9c3185f002bb2dfa01a657817');

        $('.kakao a').bind('click', e => {
            this.login();
        });


    }

    login(){
        const _this = this;
        Kakao.Auth.login({
            success: function(authObj) {
                _this.getUser();
            },
            fail: function(err) {
                alert(JSON.stringify(err));
            }
        });
    }

    getUser(){

        //{"nickName":"채수민","profileImageURL":"http://th-p.talk.kakao.co.kr/th/talkp/wknWjf0t57/gz0KRJg32ple5oztb1ncG0/27jupd_640x640_s.jpg","thumbnailURL":"http://th-p.talk.kakao.co.kr/th/talkp/wknWjf0t57/gz0KRJg32ple5oztb1ncG0/27jupd_110x110_c.jpg","countryISO":"KR"}

        Kakao.API.request({
            // url: '/v1/api/talk/profile',
            url: '/v1/user/me',
            success: function(res) {
                alert(JSON.stringify(res));
            },
            fail: function(error) {
                alert(JSON.stringify(error));
            }
        });


    }
}

new KakaoLogin();