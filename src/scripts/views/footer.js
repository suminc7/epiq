import {} from '../common/global';
import URLS from "../utils/urls";
import Notice from "./footer/Notice";
import News from "./footer/News";
import Faq from "./footer/Faq";

export default class Footer {
    constructor(){

        const path = window.location.pathname;

        if (path === URLS.viewNotice) {
            new Notice();
        }else if (path === URLS.viewNews) {
            new News();
        }else if (path === URLS.viewFaq) {
            new Faq();
        }

    }
}

new Footer();