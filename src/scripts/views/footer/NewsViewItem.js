import {list} from "../../utils/apis/list";
import {getDate} from "../../utils/date";

export default class NewsViewItem {
    constructor(parent, url){


        this.parent = parent;
        this.url = url;

        this.$viewTitle = $('.board-view-title span:eq(0)');
        this.$viewDate = $('.board-view-title span:eq(1)');
        this.$viewContent = $('.board-view-content');

        this.$showListBtn = $('#showListBtn');
        this.$prevViewBtn = $('#prevViewBtn');
        this.$nextViewBtn = $('#nextViewBtn');

        this.cid = 0;

        //showListBtn
        //prevViewBtn
        //nextViewBtn

        this.init();
    }

    init(){

        this.$showListBtn.bind('click', (e) => {
            e.preventDefault();
            window.location.hash = '#list';
        });
        this.$prevViewBtn.bind('click', (e) => {
            e.preventDefault();
            this.cid = 1 < this.cid ? this.cid-1 : 1;
            window.location.hash = `#${this.cid}`;
        });
        this.$nextViewBtn.bind('click', (e) => {
            e.preventDefault();
            const total = this.parent.listItem.totalPage;
            this.cid = total > this.cid+1 ? this.cid+1 : total;
            window.location.hash = `#${this.cid}`;


        });

    }


    loadContent(number){

        this.cid = parseInt(number);

        list(this.url, {number, languageId: epiq.lang}, (data) => {

            const {
                title,
                description,
                dateCreated
            } = data;



            const date = getDate(dateCreated);

            this.$viewTitle.html(title);
            this.$viewDate.html(date);
            this.$viewContent.html(description);

            this.parent.onView();

        });
    }
}