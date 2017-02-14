import '../common/global';
import ViewProfile from "../views/account/ViewProfile";
import ViewLeave from "../views/account/ViewLeave";
import ViewPassword from "../views/account/ViewPassword";



export default class Account {


    constructor() {
        this.init();
    }

    init(){


        const path = window.location.pathname;

        switch (path){
            case '/account/profile':
                new ViewProfile();
                break;
            case '/account/password':
                new ViewPassword();
                break;
            case '/account/leave':
                new ViewLeave();
                break;

        }

    }

    active(){

    }

    deactive(){

    }

}

new Account();













