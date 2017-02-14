import URLS from "../../utils/urls";
import NewsHashController from "./NewsHashController";
import {list} from "../../utils/apis/list";
import FaqMenuList from "../../templetes/footer/FaqMenuList";
import NewsListItem from "./NewsListItem";
import FaqList from "../../templetes/footer/FaqList";
import Const from "../../common/Const";





export default class Faq {
    constructor(){

        this.$boardList = $('#BoardList');
        this.$boardView = $('#BoardView');
        this.$faqMenu = $('.footer-wrap .menu');
        this.option = {languageId: epiq.lang, firstMenuId: 0, secondMenuId: 0, offset: 0, size: Const.faqListSize, isSearchTotalCnt: 'Y'};

        let firstIdx = 1;
        let secondIdx = 1;



        let currentFaqItem = null;
        $(document).on({
            click: (e) => {
                e.preventDefault();
                if(currentFaqItem) currentFaqItem.removeClass('active');
                const $item = $(e.currentTarget).parent();
                $item.addClass('active');
                // const contentId = $item.data('cid');
                // this.loadContent(contentId);

                currentFaqItem = $item;
            }
        }, '.faq-list .faq-item .faq-subject');




        this.menuOption = {languageId: epiq.lang};
        list(URLS.faqMenuList, this.menuOption, (data) => {

            const lists = new FaqMenuList().list(data);
            this.$faqMenu.append(lists);


            const $firstMenu = $('.submenu a');
            const $secondMenu = $('.submenu-circle');
            let currentFirstMenu = $firstMenu.eq(firstIdx-1);
            let currentSecondMenu = $secondMenu.eq(firstIdx-1);
            let currentSecondMenuBtn = currentSecondMenu.addClass('active').find('a').eq(secondIdx-1).addClass('f-now');

            $firstMenu.eq(firstIdx-1).addClass('f-now');

            $firstMenu.bind('click', (e) => {
                e.preventDefault();
                const $newFirstMenu = $(e.currentTarget);
                firstIdx = $newFirstMenu.addClass('f-now').data('cid');
                currentFirstMenu.removeClass('f-now');
                currentFirstMenu = $newFirstMenu;

                currentSecondMenu.removeClass('active');
                currentSecondMenuBtn.removeClass('f-now');
                const $newSecondMenu = $secondMenu.eq(firstIdx-1);
                currentSecondMenuBtn = $newSecondMenu.addClass('active').find('a').eq(0).addClass('f-now');
                currentSecondMenu = $newSecondMenu;

                this.listItem.currentPageNum = 1;
                this.listItem.loadList(firstIdx, 1);
                // currentSecondMenuBtn.trigger('click'); // 서브메뉴 열리면 변경
            });




            // $secondMenu.find('a').bind('click', (e) => {
            //     e.preventDefault();
            //
            //     currentSecondMenuBtn.removeClass('f-now');
            //     const newSecondMenuBtn = $(e.currentTarget);
            //     secondIdx = newSecondMenuBtn.data('cid');
            //
            //     newSecondMenuBtn.addClass('f-now');
            //     currentSecondMenuBtn = newSecondMenuBtn;
            //
            //
            //     this.listItem.loadList(firstIdx, 1);
            // });




            this.option.firstMenuId = firstIdx = $firstMenu.filter('.f-now').data('cid');
            this.option.secondMenuId = secondIdx;

            this.listItem = new NewsListItem(this, FaqList, {
                url: URLS.faqList,
                $liContainer: $('.faq-list'),
                $pageContainer: $('.board-pagination'),
                currentPageNum: 1,
                maxPageNum: 5
            });
            this.listItem.loadList();



        });


        this.init();
    }

    init(){
        new NewsHashController(this, this.viewItem);
    }

    loadContent(cid){


        list(URLS.faqInfo, this.menuOption, (data) => {

        });

    }



    onList(){
        this.$boardList.show();
        this.$boardView.hide();
    }

    onView(){
        this.$boardList.hide();
        this.$boardView.show();
    }



}