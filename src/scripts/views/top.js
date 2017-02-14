import URLS from "../utils/urls";
import Cookie from "../utils/Cookie";

export default class Top {
    constructor(){


        const $html = $('html');
        const $browser = $.browser;

        if($browser.mobile && Cookie.getCookie('mobile') != 'pcver'){
            window.location = '/mobile';
        }



        var envScript = document.getElementById("env");
        if(envScript.getAttribute("data-env") == 'prod'){
            var location = window.location;

            switch (location.pathname){
                case URLS.loginPage:
                case URLS.joinPage:
                    if(location.href.indexOf('http://') > -1){
                        window.location = location.href.replace('http://', 'https://');
                    }
                    break;
                default:
                    if(location.href.indexOf('https://') > -1){
                        window.location = location.href.replace('https://', 'http://');
                    }
                    break;
            }

        }


        // Soleil 폰트가 먼저 적용되면 윈도우에서 사파리에서 폰트가 깨져 추가함.
        if($browser.safari && $browser.platform === 'win'){
            $html.addClass('wsafari')
        }

        if($browser.msie){
            $html.addClass('msie')
        }




    }

}

new Top();