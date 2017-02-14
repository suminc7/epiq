
import request from '../utils/apis/request';
import URLS from '../utils/urls';

class LikeButton {

    constructor($el) {
        //console.log($el.length);
        this.$el = $el;
        this.$likeCount = this.$el.find('.likecount');
        if(this.$likeCount.length > 0) this.likeCountValue = parseInt(this.$likeCount.html());
        this.isClicked = false;

        this.init();
    }

    init(){
        const $el = this.$el;
        $el.bind('click', (e) => {
            e.preventDefault();

            if(this.isClicked) this.isClicked = true;

            const url = $el.hasClass('active') ? URLS.likeDelete : URLS.likeNew;
            this.requestData(url);

        });
    }

    requestData(url){

        const $el = this.$el;
        const contentId = $el.data('cid');

        request(url, `contentId=${contentId}`, (data) => {
            $el.each(function(){
                $(this).toggleClass('active');
            });

            if(this.$likeCount.length > 0) {
                this.likeCountValue = url === URLS.likeNew ? this.likeCountValue + 1 : this.likeCountValue - 1;
                this.$likeCount.html(this.likeCountValue);
            }

            this.isClicked = false;
        }, null);

    }
}

export default LikeButton;