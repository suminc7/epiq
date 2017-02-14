import NewsViewItem from "./NewsViewItem";
import NewsListItem from "./NewsListItem";
import URLS from "../../utils/urls";
import NewsHashController from "./NewsHashController";
import NewsList from "../../templetes/footer/NewsList";


export default class News {
    constructor(){

        this.$boardList = $('#BoardList');
        this.$boardView = $('#BoardView');
        this.option = {languageId: epiq.lang, offset: 0, size: 10, isSearchTotalCnt: 'Y'};

        this.listItem = new NewsListItem(this, NewsList, {
            url: URLS.newsList,
            $liContainer: $('.board-list tbody'),
            $pageContainer: $('.board-pagination'),
            currentPageNum: 1,
            maxPageNum: 10
        });


        this.viewItem = new NewsViewItem(this, URLS.newsInfo);



        this.init();
        this.initHash();
    }

    init(){

        this.listItem.loadList();
        new NewsHashController(this, this.viewItem);
    }

    initHash(){

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