import SNSLogin from "./SNSLogin";

export default class GoogleLogin extends SNSLogin {
    constructor() {
        const _super = super();

        this.init();




        var auth2;
        var startApp = function() {
            gapi.load('auth2', function(){
                // Retrieve the singleton for the GoogleAuth library and set up the client.
                auth2 = gapi.auth2.init({
                    client_id: '638826867381-75ej0ov261is2h8usk',
                    cookiepolicy: 'single_host_origin',
                    // Request scopes in addition to 'profile' and 'email'
                    //scope: 'additional_scope'
                });
                attachSignin(document.getElementById('googleBtn'));
            });
        };

        const getProfile = (googleUser) => {
            var profile = googleUser.getBasicProfile();

            const result = {
                email: profile.getEmail(),
                nickname: profile.getGivenName(),
                snsType: 'GOOGLEPLUS',
            };

            super.login(result);
        };


        function attachSignin(element) {

            auth2.attachClickHandler(element, {},
                function(googleUser) {
                    getProfile(googleUser);
                }, function(error) {
                    alert(JSON.stringify(error, undefined, 2));
                });
        }

        startApp();










    }

    init(){



        $('.google a').bind('click', e => {
        });


    }

}
