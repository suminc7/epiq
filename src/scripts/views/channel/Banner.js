

export default class Banner {
    constructor(idx = -1){

        this.idx = idx;

        this.$BannerContainer = $('.list-pages .banner');
        this.$backItem = $('.banner-back li', this.$BannerContainer);
        this.$bannerItem = $('.banner-item', this.$BannerContainer);
        this.$leftArr = $('.left-arrow', this.$BannerContainer);
        this.$rightArr = $('.right-arrow', this.$BannerContainer);

        this.bannerLeng = this.$bannerItem.length;

        this.isActive = false;

        this.init();
    }

    init(){

        this.$currentBackItem = this.$backItem.filter('.active');
        this.$currentBannerItem = this.$bannerItem.filter('.active');

        if(this.$bannerItem.length < 2){
            this.$leftArr.remove();
            this.$rightArr.remove();
        }


        //idx값 활성화
        if(this.idx > -1){
            this.$currentBackItem.removeClass('active');
            this.$currentBannerItem.removeClass('active');
            this.$currentBackItem = this.$backItem.eq(this.idx).addClass('active');
            this.$currentBannerItem = this.$bannerItem.eq(this.idx).addClass('active');
        }

        this.idx = this.$currentBackItem.index();


        this.$leftArr.bind('click', () => {
            this.idx = this.idx > 0 ? this.idx-1 : this.bannerLeng-1;
            this.onBanner(this.idx, 'left');
        });

        this.$rightArr.bind('click', () => {
            this.idx = this.idx < this.bannerLeng-1 ? this.idx+1 : 0;
            this.onBanner(this.idx, 'right');
        });

    }

    onBanner(idx, type){

        //console.log(this.isActive, idx);
        if(this.isActive) return;

        this.isActive = true;
        setTimeout(() => {
            this.isActive = false;
        }, 1000);


        const backItem = this.$backItem.eq(idx);
        const bannerItem = this.$bannerItem.eq(idx);

        if(this.$currentBackItem.is(backItem)){
            return;
        }
        backItem.addClass('animating');
        bannerItem.addClass('animating');

        if(type === 'left'){
            if(!backItem.hasClass('grand')){
                TweenMax.set(backItem, {backgroundPosition: '60% 50%'});
            }
        }else if(type === 'right'){
            if(!backItem.hasClass('grand')){
                TweenMax.set(backItem, {backgroundPosition: '40% 50%'});
            }
        }




        TweenMax.to(this.$bannerItem.filter('.active').find('.img'), 0.6, {autoAlpha: 0});
        TweenMax.to(this.$bannerItem.filter('.active').find('.desc'), 0.6, {autoAlpha: 0});
        TweenMax.to(this.$bannerItem.filter('.animating').find('.img'), 0.4, {autoAlpha: 1});
        TweenMax.to(this.$bannerItem.filter('.animating').find('.desc'), 0.4, {autoAlpha: 1});



        TweenMax.to(backItem, 1, {alpha: 1, backgroundPosition: '50% 50%', ease: Power1.easeInOut, onComplete: (item) => {
            item.removeClass('animating').addClass('active');
            this.$currentBackItem.removeClass('active');
            this.$currentBackItem = item;
        }, onCompleteParams: [backItem], clearProps: 'all'});

        TweenMax.to(bannerItem, 1, {alpha: 1, ease: Power1.easeInOut, onComplete: (item) => {
            item.removeClass('animating').addClass('active');
            this.$currentBannerItem.removeClass('active');
            this.$currentBannerItem = item;
        }, onCompleteParams: [bannerItem], clearProps: 'all'});







    }
}
