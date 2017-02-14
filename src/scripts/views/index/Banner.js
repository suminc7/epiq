// import ButtonActive from "../../components/ButtonActive";
//
// export default class Banner {
//     constructor(){
//
//         this.$BannerContainer = $('.index .banner');
//         this.$bannerBtn = $('.banner-tab a');
//         this.$bannerItem = $('.banner-item', this.$BannerContainer);
//         this.$leftArr = $('.left-arrow a', this.$BannerContainer);
//         this.$rightArr = $('.right-arrow a', this.$BannerContainer);
//
//         this.bannerLeng = this.$bannerItem.length;
//
//         this.init();
//     }
//
//
//
//     init(){
//
//         new ButtonActive(this.$bannerBtn);
//
//
//         this.$currentBannerItem = this.$bannerItem.filter('.active');
//         this.idx = this.$currentBannerItem.index();
//
//         this.$bannerBtn.bind('click', (e) => {
//             this.idx = $(e.currentTarget).parent().index();
//             this.onBanner(this.idx);
//         });
//
//         this.$leftArr.bind('click', () => {
//             this.idx = this.idx > 0 ? this.idx-1 : this.bannerLeng-1;
//             this.$bannerBtn.eq(this.idx).trigger('click');
//         });
//
//         this.$rightArr.bind('click', () => {
//             this.idx = this.idx < this.bannerLeng-1 ? this.idx+1 : 0;
//             this.$bannerBtn.eq(this.idx).trigger('click');
//         });
//
//
//
//     }
//
//     onBanner(idx){
//
//         const bannerItem = this.$bannerItem.eq(idx);
//         if(this.$currentBannerItem.is(bannerItem)){
//             return;
//         }
//         bannerItem.addClass('animating');
//
//         let wid = $(window).width();
//         let hei = 360;
//
//         if(wid > 1920){
//             hei = wid / 1920 * 360;
//         }else{
//             wid = 1920;
//         }
//
//
//         TweenMax.set(bannerItem,{backgroundSize:`${wid*1.1}px ${hei*1.1}px`});
//         TweenMax.to(bannerItem, 1, {alpha: 1, backgroundSize: `${wid}px ${hei}px`, ease: Power1.easeInOut, onComplete: (item) => {
//             item.removeClass('animating').addClass('active');
//             this.$currentBannerItem.removeClass('active');
//             this.$currentBannerItem = item;
//         }, onCompleteParams: [bannerItem], clearProps: 'all'});
//
//     }
// }

import SliderBanner from "../../components/SliderBanner";

export default class Banner {
    constructor(bannerArea) {

        this.$BannerContainer = $('.banner');

        this.option = bannerArea;

        this.init();
    }

    el() {
        return `<div class="slider">
                    <div class="left-area"></div>
                    <div class="center-area">
                        <a class="banner-path">
                            <div class="banner-text">
                                <div class="text-inner"></div>
                            </div>
                            <ul class="slides"></ul>
                        </a>
                    </div>
                    <div class="right-area"></div>
                </div>
                <div class="banner-box">
                    <ul class="banner-tab"></ul>
                    <div class="left-arrow animation">
                        <a href="#">
                            <img src="images/index/banner_left_arr.png" alt=""/>
                        </a>
                    </div>
                    <div class="right-arrow animation">
                        <a href="#">
                            <img src="images/index/banner_right_arr.png" alt=""/>
                        </a>
                    </div>
                </div>`;
    }

    styleDiv($centerWid) {
        let w = $(window).width();
        let centerWid = $centerWid.width();

        $('.left-area').css('width', (w - centerWid) / 2);
        $('.right-area').css('width', (w - centerWid) / 2);
    }

    init() {
        this.$BannerContainer.append(this.el());

        let banner = new SliderBanner(this.option);

        // const $slideContainer = $('.slides', this.$BannerContainer);
        const $leftArr = $('.left-arrow', this.$BannerContainer);
        const $rightArr = $('.right-arrow', this.$BannerContainer);
        const $centerArea = $('.center-area', this.$BannerContainer);
        const $leftArea = $('.left-area', this.$BannerContainer);
        const $rightArea = $('.right-area', this.$BannerContainer);

        this.styleDiv($centerArea);
        $(window).on('resize', () => this.styleDiv($centerArea) );


        // banner event
        $leftArr.bind('click', (e) => banner.animate(0, e) );
        $rightArr.bind('click', (e) => banner.animate(1, e) );
        $leftArea.bind('click', (e) => banner.animate(0, e) );
        $rightArea.bind('click', (e) => banner.animate(1, e) );
    }
}




