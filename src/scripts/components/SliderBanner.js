/**
 * Created by jaesung on 2017. 1. 5..
 */

import request from "../utils/apis/request";
import URLS from "../utils/urls";

let $slider;
let cycleTimer;

export default class SliderBanner {
    constructor(area) {

        this.area  = area;
        this.init();

    }

    init() {
        $slider = $('.slider');
        this.loadData();
    }

    loadData() {
        request(URLS.bannerList, {
            languageId: epiq.lang,
            bannerEnv: 'WEB',
            bannerArea: this.area
        }, (data) => {
            this.banner = data.bannerInfoResDtoList;
            this.slide();
        }, null, 'GET');
    }

    bannerText($elem, idx) {
        // Remove if child elements exist.
        if ($elem.children().length > 0) {
            $elem.children().remove();
        }
        $elem.append(`
            <span>${this.banner[idx].bannerMarkId}</span>
            <h2>${this.banner[idx].bannerTitle}</h2>`);

        const {
            bannerDescFirst,
            bannerDescSecond,
            bannerDescThird,
            linkAction,
            linkUrl
        } = this.banner[idx];

        let textFirst = bannerDescFirst || '';
        let textSecond = bannerDescSecond || '';
        let textThird = bannerDescThird || '';
        let link = linkUrl || '#';
        let cursorVal = linkUrl ? 'pointer' : 'default';
        let target;

        switch (linkAction) {
            case 'NEW':
                target = '_blank';
                break;
            case 'CURRENT':
                target = '_self';
                break;
            default:
                target = '';
                break;
        }

        $elem.append(`<p>${textFirst}</p><p>${textSecond}</p><p>${textThird}</p>`);
        $('.banner-path').attr({'href': link, 'target': target}).css('cursor', cursorVal);
    }

    slide() {
        // configuration for slide
        this.viewNum = 3;
        this.$slideContainer = $('.slides', $slider);
        this.$bannerTab = $('.banner-tab');
        this.$textInner = $('.text-inner');
        this.totalLeng = this.banner.length;
        this.increment = this.viewNum;
        this.firstNum = this.viewNum;
        this.lastNum = (this.totalLeng - 1) - this.viewNum;
        this.liWidth = ('li', this.$slideContainer).width();

        // Get and insert datum after page is loaded
        /***************************************************************/

        for (let i = 0; i < this.banner.length; i++) {

            const { bannerImagePath } = this.banner[i];

            let banner = `<li><img src="${bannerImagePath}" width="100%"/></li>`;

            this.$slideContainer.append(banner);
            this.$bannerTab.append(`<li><a href="#"><span></span></a></li>`);
        }
        this.bannerText(this.$textInner, 0);

        /***************************************************************/

        const $first = $('>li:lt('+ this.firstNum +')', this.$slideContainer);
        const $last = $('>li:gt('+ this.lastNum +')', this.$slideContainer);

        this.$indicator = $('a', this.$bannerTab);
        this.$slideContainer.append($first.clone());
        this.$slideContainer.prepend((this.lastNum != -1) ? $last.clone() : $first.clone());
        this.$slideContainer.width(this.liWidth * (this.totalLeng + this.viewNum * 2));
        this.$slideContainer.css('margin-left', -this.liWidth * this.viewNum);
        this.$indicator.eq(0).addClass('active');



        this.startCycle = () => {
            cycleTimer = setInterval(() => this.animate(1), 4000);
        };
        this.startCycle();

        // indicator 이벤트
        this.$indicator.bind('click', (e) => {
            if (this.$slideContainer.is(':animated') == true) return;
            clearInterval(cycleTimer);
            this.startCycle();
            let idx = $(e.currentTarget).parent().index();
            this.increment = idx + this.viewNum;
            this.$indicator.removeClass('active');
            $(e.currentTarget).parent().find('a').addClass('active');
            this.$textInner.css('opacity', 0);
            this.$slideContainer.stop().animate({'margin-left': -this.liWidth * this.increment}, 500, () => {
                this.$textInner.css({'opacity': 1, 'transition': 'opacity .3s ease-in-out' });
                this.bannerText(this.$textInner, idx);
            });
        });
    }

    /*
     * @param dir 방향 지정 - 0이면 왼쪽 1이면 오른쪽
     */
    animate(dir, event) {
        if (this.$slideContainer.is(':animated') == true) return;
        if (event) {
            clearInterval(cycleTimer);
            this.startCycle();
        }
        dir ? this.increment++ : this.increment--;
        this.$textInner.fadeTo('fast', 0);
        this.$slideContainer.stop().animate({'margin-left': -this.liWidth * this.increment}, 500, () => {
            if (dir) {
                if (this.increment === this.totalLeng + this.viewNum) {
                    this.increment = this.viewNum;
                    this.$slideContainer.css('margin-left', -this.liWidth * this.increment);
                }
            } else {
                if (this.increment === this.viewNum - 1) {
                    this.increment = this.totalLeng + this.viewNum - 1;
                    this.$slideContainer.css('margin-left', -this.liWidth * this.increment);
                }
            }
            this.$indicator.removeClass('active');
            this.$indicator.eq(this.increment - this.viewNum).addClass('active');
            this.$textInner.fadeTo(300, 1);
            this.bannerText(this.$textInner, this.increment - this.viewNum);
        });
    }

}