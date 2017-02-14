import StringUtils from "./String";

export default class URLS {


	static get loginPage(){
		return '/login';
	}

    static loginPageWithURL(url){
        url = StringUtils.removeDomain(url);
        return `${this.loginPage}?url=${url}`;
    }

	static goLoginPageWithURL(){
		if(window.epiq.isLogin == "N"){
			let url = window.location.href;
			url = StringUtils.removeDomain(url);
			window.location = this.loginPageWithURL(url);
		}

	}


}