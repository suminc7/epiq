import StringUtils from "./StringUtils";
import Const from "../common/Const";



export default class URLS {


    static get rootURL(){
        return '/';
    }
    static get viewMypage(){
        return '/channel/my';
    }
    static get loginPage(){
        return '/login';
    }
    static get joinPage(){
        return '/join';
    }
    static get checkNickname(){
        return '/user/checknickname';
    }
    static get checkEmail(){
        return '/user/checkemail';
    }

    static get viewjoinSNS(){
        return '/user/activate_sns';
    }


    static get bannerList() {
        return '/banner/list';
    }




    static get viewSearch(){
        return '/search';
    }

    static get joinURL(){
        return '/user/new';
    }
    static get login(){
        return '/user/login';
    }
    static get logout(){
        return '/user/logout';
    }


    static get premiumRecommend(){
        return "/premium/search/recommend";
    }
    static get premiumList(){
        return "/premium/search/content/list";
    }
    static get premiumRank(){
        return "/premium/search/content/rank";
    }


    /**
     * content
     */
    static get contentGetContent(){
        return "/content/get_content";
    }
    static get contentViewCount(){
        return "/content/view_count";
    }
    static get contentNew(){
        return "/content/new";
    }
    static get contentModify(){
        return "/content/modify";
    }
    static get videoUploadURL(){
        return "/content/upload";
    }
    static get contentProgressURL(){
        return "/content/progress";
    }
    static get contentDelete(){
        return "/content/delete";
    }
    static get recommend(){
        return "/content/search/recommend";
    }
    static get popular(){
        return "/content/search/popular";
    }
    static get keyword(){
        return "/content/search/keyword";
    }
    static get contentrecommend(){
        return "/content/search/contentrecommend";
    }
    static get contentChannel(){
        return "/content/search/channel";
    }

    static get ownList(){
        return "/content/own/search";
    }
    static get contentOwn(){
        return "/content/own/GET";
    }

    static get category(){
        return "/content/search/category";
    }
    static get searchKeyword(){
        return "/content/search/keyword";
    }

    static get likeNew(){
        return "/content/like/new";
    }
    static get likeDelete(){
        return "/content/like/delete";
    }
    static get complaintNew(){
        return "/complaint/new";
    }





    static get followNew(){
        return "/user/follow/new";
    }
    static get followDelete(){
        return "/user/follow/delete";
    }
    static get modifyUserInfo(){
        return "/user/modify";
    }
    static get userFollowerList(){
        return "/user/follower/search/list";
    }
    static get userFollowingList(){
        return "/user/following/search/list";
    }
    static get changePassword(){
        return "/user/changepassword";
    }
    static get userLeave(){
        return "/user/dropout";
    }
    static get userSnsLogin(){
        return "/user/snsLogin";
    }
    static get userSnsJoin(){
        return "/user/newsns";
    }
    static get userIssuePasswd(){
        return "/user/issuepassword";
    }
    static get modifyChannelDesc(){
        return "/user/modifychanneldesc";
    }
	static get afterUpdatePasswd(){
		return "/user/changelastpwd";
	}

    static get viewUserPwdChange(){
        return "/user/pwdchange";
    }
    static get viewUserIdentify(){
        return "/user/identify";
    }
    static get viewUserDormant(){
        return "/user/dormant";
    }
    static get viewEmailAuth(){
        return "/user/emailauth";
    }
    static get viewDoEmailAuth(){
        return "/user/doemailauth";
    }
    static get viewReEmailAuth(){
        return "/user/reemailauth";
    }
    static get viewNotice(){
        return "/notice";
    }
    static get viewNews(){
        return "/news";
    }
    static get viewFaq(){
        return "/faq";
    }




    static get newsList(){
        return "/news/list";
    }
    static get newsInfo(){
        return "/news/info_language";
    }
    static get noticeList(){
        return "/notice/list";
    }
    static get noticeInfo(){
        return "/notice/info_language";
    }

    static get faqMenuList(){
        return "/faq/menu_list";
    }
    static get faqList(){
        return "/faq/list";
    }
    static get faqInfo(){
        return "/faq/info";
    }




    static get reAuthorization(){
        return "/user/reauthorization";
    }

    static get recentlyNew(){
        return "/recently/own/new";
    }

    static get recentlyDeleteAll(){
        return "/recently/own/deleteall";
    }

    static get recentlyList(){
        return "/recently/own/search/recently";
    }
    static get recentlyLikeList(){
        return "/recently/own/search/recentlylike";
    }

    static get channelRecommend(){
        return "/channel/search/recommend";
    }
    static get channelRank(){
        return "/channel/search/rank";
    }
    static get channelInfo(){
        return "/channel/info";
    }




    static get vrStarRecommend(){
        return "/vr_star/search/recommend";
    }
    static get vrStarRank(){
        return "/vr_star/search/content/rank";
    }



    static get followingList(){
        return "/user/following/search/list";
    }

    static get templateModifyPopup(){
        return "/templates/modifyPopup";
    }

    constructor(){

    }


    /**
     * login page
     * @param url
     * @returns {string}
     */
    static loginPageWithURL(url){
        url = StringUtils.removeDomain(url);
        return `${this.loginPage}?url=${url}`;
    }


    /**
     * 세션 체크가 필요한 버튼에 실행한다. 이전 페이지로 돌아갈때..
     * @param e: event or url
		 * @example
		 * this.$uploadBtn.bind('click', e => {
		 * 	URLS.goLoginPageWithURL(e);
		 * });
     */
    static goLoginPageWithURL(e){
        if(epiq.isLogin == "N"){
						if(e.preventDefault) e.preventDefault();

						let url = e.currentTarget ? $(e.currentTarget).attr('href') : e;
						url = StringUtils.removeDomain(url);
            window.location = this.loginPageWithURL(url);
        }

    }


    /**
     * 로그인 페이지에서 url 파라미터가 있는경우를 체크한다.
     */
    static goPagesAfterLogin(){
        let url = StringUtils.getURLParameter('url');
        url = StringUtils.removeDomain(url);

        if(url.substring(0,1) === '/'){
            window.location = url;
        }else{
            window.location = URLS.rootURL;
        }


        // if(epiq.env == 'prod'){
        //     if(url.substring(0,1) === '/'){
        //         window.location = url;
        //     }else{
        //         window.location = URLS.rootURL;
        //     }
        // }else{
        //     if(url != 'null' && url.length > 0){
        //         window.location = url;
        //     }else{
        //         window.location = URLS.rootURL;
        //     }
        // }
    }










}