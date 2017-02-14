
import request from '../utils/apis/request';
import URLS from '../utils/urls';
import Locale from "../utils/Locale";


const followClassText = 'follow';
const followingClassText = 'following';

const userId = epiq.userId;

class FollowButton {

    constructor() {

        this.isClicked = false;
    }

    static init(){


        $('.follow-btn').each(function(){
            const $this = $(this);
            if($this.data('fid').toString() === userId){
                $this.hide();
            }else{
                if($this.data('isfollow') == 'Y'){
                    $this.addClass(followingClassText)
                }else{
                    $this.addClass(followClassText)
                }
            }
        });

        const followBtn = new FollowButton();
        function thisClick(e){
            followBtn.bindClick($(this));
            e.preventDefault();
        }
        $(document).on({click: thisClick}, '.follow-btn');

    }

    bindClick($el){

        this.$el = $el;

        if(this.isClicked){
            return;
        }
        this.isClicked = true;


        let url = '';
        let method = '';
        let text = '';

        if($el.hasClass('follow')){
            url = URLS.followNew;
            method = 'POST';
            text = this.followingTextLocale;
        }else if($el.hasClass('following')){
            url = URLS.followDelete;
            method = 'POST';
            text = this.followTextLocale;
        }

        this.requestData(url, method, text);
    }


    setElement($el){
        $el.bind('click', (e) => {
            this.bindClick($el);
            e.preventDefault();
        });
    }

    createElement(isFollow, channelUserId){

        if(channelUserId.toString() === userId){
            return '';
        }


        let followClass = '';
        let followingText = '';

        if(isFollow === 'Y'){
            followClass = followingClassText;
            followingText = this.followingTextLocale;
        }else{
            followClass = followClassText;
            followingText = this.followTextLocale;
        }

        return `<a href="#" class="follow-btn btn-rad btn-rad-default ${followClass}" data-fid="${channelUserId}">${followingText}</a>`;
    }


    get followingTextLocale(){
        return Locale.prop('common.btn_following');
    }

    get followTextLocale(){
        return Locale.prop('common.btn_follow');
    }

    requestData(url, method, text){

        const $el = this.$el;
        const followUserId = $el.data('fid');

        request(url, `followUserId=${followUserId}`, (data) => {
            $el.toggleClass('follow following').html(text);
            this.isClicked = false;
        }, null, method);

    }
}

export default FollowButton;


FollowButton.init();