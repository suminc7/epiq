import URLS from '../utils/urls';
import Validation from '../utils/form.validation';
import request from '../utils/apis/request';
import Cookie from "../utils/Cookie";
import StringUtils from "../utils/StringUtils";

const $gnbSearchInput = $('#gnbSearchInput');
const $profileArea = $('#profileArea');
const $sideMenuBtn = $('#sideMenuBtn');
const $sideMenu = $('#sideMenu');
const $logoutBtn = $('.gnb .logout-btn');
const $gnbBack = $('.gnb .back');
const $menu = $('.menu li');
const $blind = $('.header-blind');
const $moreBtn = $('.more .more-btn');

$moreBtn.bind('click', () => {
    if(window.location.href.indexOf('#') > 0){
        window.location.reload();
    }else{
        window.location = '/channel#following';
    }
});


$logoutBtn.bind('click', function(e){
    request(URLS.logout, {}, function(data){
        Cookie.setCookie('xauth', '', 1);
        window.location = '/';
    }, null, 'GET');

});



/**
 * 스크롤 했을때 gnb 배경 opacity 값을 조절 한다. reset.scss 파일에도 추가 한다.
 */
const scrollArr = [
    'index',
    'channel',
    'premium',
    'vrstar',
    'about'
];

let isScroll = false;
for (const scrollItem of scrollArr){
    if($('body').hasClass(scrollItem)){
       isScroll = true;
    }
}


const maxTop = 100;
const minTop = 10;
function scrollListener() {
    let scrollTop = $(window).scrollTop();

    if(minTop > scrollTop){
        scrollTop = minTop;
    }
    if(maxTop < scrollTop){
        scrollTop = maxTop;
    }
    let opacity = (scrollTop - minTop) / (maxTop - minTop);
    TweenMax.to($gnbBack, 0, {alpha:opacity});
}



if(isScroll){
    $(window).scroll(function(){
        scrollListener();
    });
    scrollListener();

}







/**
 * 사이드 메뉴 버튼 클릭시
 */


let currentScrollTop;

$blind.click(function(){
    TweenMax.to($sideMenu, 0.6, {x:0, ease:Power2.easeInOut, clearProps:'all'});
    TweenMax.to($blind, 0.6, {autoAlpha: 0, clearProps:'all'});
    $sideMenu.removeClass('active');
    $blind.removeClass('active');

    // $('html').removeClass('side');
    // $(window).scrollTop(currentScrollTop);

});

$sideMenuBtn.click(function(e){
    currentScrollTop = $(window).scrollTop();
    $sideMenu.addClass('active');
    $blind.addClass('active');
    // $('html').addClass('side');
    // $('body').scrollTop(currentScrollTop);

    TweenMax.to($sideMenu, 0.6, {x:400, display:'block', ease:Power2.easeInOut});
    TweenMax.to($blind, 0.6, {autoAlpha: 1, display:'block'});
    e.preventDefault();
});


/**
 * 오른쪽 로그인후 프로필 이미지
 */
$profileArea.click(function(){
    $(this).toggleClass('active');
});

$('.profile-popup').bind('click', function(e){
    if($(e.currentTarget).is(this)){
        e.stopImmediatePropagation();
    }
});

$(document).bind('click', function(e){

    if($profileArea.hasClass('active')){
        $profileArea.toggleClass('active');
    }
});

/**
 * search bar 에서 엔터를 클릭
 */

function searchHandler() {

    if(Validation.checkSearch(this)){
        return;
    }

    const value = StringUtils.removeTagAndNewline(this.value);

    window.location = `${URLS.viewSearch}?keyword=${value}`;
}

$gnbSearchInput.keypress(function (e) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
        searchHandler.call(this);
    }
});

$('#searchBtn').bind('click', () => {
    searchHandler.call($gnbSearchInput[0]);
});


const menuActive = idx => {
    $menu.eq(idx).addClass('active');
};


export {
    menuActive
}
