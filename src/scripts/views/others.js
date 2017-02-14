import {} from '../common/global';
import URLS from "../utils/urls";
import Identify from "./user/Identify";
import Pwdchange from "./user/Pwdchange";
import Dormant from "./user/Dormant";
import ReEmailAuth from "./user/ReEmailAuth";

export default class Others {
    constructor(){

        const path = window.location.pathname;


        if (path === URLS.viewUserIdentify) {
            new Identify();
        } else if (path === URLS.viewUserPwdChange) {
            new Pwdchange();
        } else if (path === URLS.viewUserDormant) {
            new Dormant();
        } else if (path === URLS.viewReEmailAuth) {
            new ReEmailAuth();
        }

    }
}

new Others();