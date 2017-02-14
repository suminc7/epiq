

import Locale from "../utils/Locale";

const locale = new Locale();
locale.load(['messages'], function(){
});





if(location.href.indexOf(Const.domain) != -1 ){
    //noinspection JSAnnotator
    document.domain = Const.domain;
}



(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-85186499-1', 'auto');
ga('send', 'pageview');


import ScrollScope from '../../library/common/scroll-scope'
import "./JqueryPlugins";
import '../components/FollowButton';
import "../views/footer/Footer";
import {menuActive} from './gnb'
import Const from "./Const";


$(window).load(function(){

    setTimeout(function(){
        $(document).scrollTop(0);
    }, 10);
});


/**
 * 스크롤 이벤트가 상위 노드에 전파되는걸 방지하는 플러그인
 * @type {any}
 */
var myScrollScopeInstance = new ScrollScope({
    elements: '[data-scroll-scope]',
    events: 'DOMMouseScroll mousewheel'
});
myScrollScopeInstance.bind(document);

/**
 * ie 스크롤바를 맥 스크롤바로 대체하는 플러그인
 */
if($.browser.win){
    $('.scrollbar-macosx').scrollbar();
}


/**
 * href 가  # 이면 상단으로 스크롤 되는걸 방지한다.
 * @returns {boolean}
 */
function returnAtag(){
    if($(this).attr('href') === '#'){
        return false;
    }
}
$(document).on({click: returnAtag}, 'a');
$('a').bind('click', returnAtag);


/**
 * disable class가 있는 버튼은 이벤트 전파를 차단한다.
 * @param e
 * @returns {boolean}
 */

function diableButton(e){
    if($(e.currentTarget).hasClass('disable')){
        e.stopImmediatePropagation();
        return false;
    }
}
$('a, button').bind('click', diableButton);
$(document).on({click: diableButton}, 'a, button');



/**
 * select box: 계정 설정 페이지
 */
$('select').selectize({});
$(".selectize-input input").attr('readonly','readonly');


/**
 * radio: 탈퇴 페이지 text input 선택시
 */
$('.radio input[type=text]').focus(function(){
    $(this).parent().prev().prop('checked', 'checked');
});



/**
 * text input, textarea의 maxlength 만큼 제한한다.
 */
var maxLengthListener = function(){
    var $this = $(this), value = $this.val(), length = value.length, maxlength = $this.attr('maxlength'), $countEl = $this.parent().find('.count');


    var newLines = value.match(/(\r\n|\n|\r)/g);
    var addition = 0;
    if (newLines != null) {
        addition = newLines.length;
    }
    length += addition;

    if (length > maxlength) {
        $this.val(value.substr(0, maxlength));
    }else{

        $countEl.html(length);
        if (length == maxlength){
            $countEl.addClass('error');
        }else{
            if($countEl.hasClass('error')) $countEl.removeClass('error');
        }
    }
};
$("textarea.maxlength, input[type=text].maxlength").on('keydown keyup blur', maxLengthListener).trigger('keyup');
$(document).on({'keydown keyup blur': maxLengthListener}, 'textarea.maxlength, input[type=text].maxlength').trigger('keyup');












export {
    menuActive
}