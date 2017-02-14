import Const from "../../common/Const";
import ButtonActive from "../../components/ButtonActive";
import URLS from "../../utils/urls";
import StringUtils from "../../utils/StringUtils";


let parent;

let cateMaxPageNum = 0;
let catePageNum = 0;
let cateOffsetWid = Const.maxDefaultWidth;
let cateTotalPage = 0;

const $category = $('.category-container');
const $categoryBox = $('.category');
const $leftArrow = $('.category-left-arrow');
const $rightArrow = $('.category-right-arrow');
const $categoryBtn = $('.category a');
const $listTabBtn = $('.list-tab a');

const cateLenth = $categoryBtn.length;

export default class Category {
    constructor(p){
        parent = p;


        this.isParams = false;

        const cateId = StringUtils.getURLParameter('categoryId');
        if(cateId > 0){
            this.isParams = true;
            parent.option.categoryId = cateId;
        }

        new ButtonActive($categoryBtn);


        this.init();
        this.initButton();
    }

    init(){




        // 카테고리 버튼 클릭시
        $categoryBtn.bind('click', (e) => {
            e.preventDefault();
            parent.url = URLS.category;
            parent.option.categoryId = $(e.currentTarget).data('id');
            parent.option.offset = 0;
            parent.load();
        });


        const $win = $(window);
        const maxDefaultWidth = Const.maxCategoryWidth;
        const minDefaultWidth = Const.minCategoryWidth;

        // 리사이즈시 카테고리 버튼 위치 변경 및 화살표 위치 변경
        const resize = () => {
            if($win.width() < maxDefaultWidth){
                if(cateMaxPageNum != Const.minCateNum){
                    cateMaxPageNum = Const.minCateNum;
                    cateOffsetWid = minDefaultWidth;
                    this.setCategoryPosition();
                    this.setArrow();
                }
            }else{
                if(cateMaxPageNum != Const.maxCateNum){
                    cateMaxPageNum = Const.maxCateNum;
                    cateOffsetWid = maxDefaultWidth;
                    this.setCategoryPosition();
                    this.setArrow();
                }
            }
        };
        resize();
        $win.resize(resize);


    }

    initButton(){
        $rightArrow.bind('click', function(e){
            e.preventDefault();
            if(!$rightArrow.hasClass('active')){
                return;
            }
            if(catePageNum <= cateTotalPage){
                $leftArrow.addClass('active');
                TweenMax.to($categoryBox, 0.8, {x:-cateOffsetWid * ++catePageNum, ease:Power2.easeInOut});
                if(catePageNum == cateTotalPage) $rightArrow.removeClass('active');
            }
        });

        $leftArrow.bind('click', function(e){
            e.preventDefault();
            if(!$leftArrow.hasClass('active')){
                return;
            }
            if(0 <= catePageNum){
                $rightArrow.addClass('active');
                TweenMax.to($categoryBox, 0.8, {x:-cateOffsetWid * --catePageNum, ease:Power2.easeInOut});
                if(catePageNum == 0) $leftArrow.removeClass('active');
            }
        });
    }

    start(){
        // 파라미터에 카테고리 id 가 있을경우 활성화
        if(this.isParams){
            $listTabBtn.filter('[data-pid=category]').trigger('click');
            // $categoryBtn.filter(`[data-id=${parent.option.categoryId}]`).trigger('click');
        }else{
            parent.load();
        }
    }


    /**
     * 리사이즈시 12개에서 8개로 변경할때 카테고리 버튼 페이징
     */
    setCategoryPosition(){
        const idx = $categoryBtn.filter(`[data-id=${parent.option.categoryId}]`).parent().index();
        catePageNum = idx > 0 ? Math.floor(idx / cateMaxPageNum) : 0;
        cateTotalPage = (Math.floor(cateLenth / cateMaxPageNum) - 1) + (cateLenth % cateMaxPageNum > 0 ? 1 : 0) ;
        TweenMax.set($categoryBox, {x:-cateOffsetWid * catePageNum});
    }

    setArrow(){
        if(catePageNum < 1){
            $leftArrow.removeClass('active');
            $rightArrow.addClass('active');
        }else if(0 < catePageNum && catePageNum < cateTotalPage){
            $leftArrow.addClass('active');
            $rightArrow.addClass('active');
        }else if(catePageNum == cateTotalPage){
            $leftArrow.addClass('active');
            $rightArrow.removeClass('active');
        }

        if(cateLenth < 13){
            $leftArrow.removeClass('active');
            $rightArrow.removeClass('active');
        }
    }

    active(){
        $category.addClass('active');

        if(this.isParams){
            $categoryBtn.filter(`[data-id=${parent.option.categoryId}]`).trigger('click');
        }else{
            $categoryBtn.eq(0).trigger('click');
        }
    }

    deactive(){
        $category.removeClass('active');
    }
}