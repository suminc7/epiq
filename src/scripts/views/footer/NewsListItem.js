import {list} from "../../utils/apis/list";
import ButtonActive from "../../components/ButtonActive";

export default class NewsListItem {
    constructor(parent, ClassItem, object){

        this.option = parent.option;
        this.ClassItem = ClassItem;

        this.url = object.url;
        this.$liContainer = object.$liContainer;
        this.$pageContainer = object.$pageContainer;
        this.currentPageNum = object.currentPageNum;
        this.maxPageNum = object.maxPageNum;


    }


    get totalPage(){
        return this.totalCnt;
    }

    loadList(firstIdx = 0, secondIdx = 0){

        this.option.offset = this.option.size * (this.currentPageNum - 1);
        if(firstIdx > 0) this.option.firstMenuId = firstIdx; // faq
        if(secondIdx > 0) this.option.secondMenuId = secondIdx; // faq

        list(this.url, this.option, (data) => {

            this.$liContainer.html('');
            this.$pageContainer.html('');

            const {
                code,
                resultList,
                totalCnt
            } = data;




            if(code === 200){

                this.totalCnt = totalCnt;

                let listItemString = '';
                for(const listItem of resultList){
                    listItemString += new this.ClassItem(this.option).list(listItem, totalCnt);
                }
                this.$liContainer.append(listItemString);


                // page numbers
                let totalPageNum  = Math.floor(totalCnt / this.option.size) + (totalCnt % this.option.size > 0 ? 1 : 0);

                let prevNum = Math.floor(this.currentPageNum / (this.maxPageNum+1)) * this.maxPageNum;
                let nextNum = Math.floor(totalPageNum / (this.maxPageNum+prevNum)) >= 1 ? prevNum + this.maxPageNum : prevNum + totalPageNum % this.maxPageNum;

                const prevBtnNum = prevNum;
                const nextBtnNum = (Math.floor(this.currentPageNum / (this.maxPageNum+1)) + 1) * (this.maxPageNum+1);


                // page btn element
                let pageString = `<li class="prev">${prevBtnNum > 0 ? `<a href="#"></a>` : `<span></span>`}</li>`;
                for (let i = prevNum; i < nextNum; i++){
                    const active = this.currentPageNum == i+1 ? ` class="active"` : ``;
                    pageString += `<li${active}><a href="#" class="page-btn">${i+1}</a></li>`;
                }
                pageString += `<li class="next">${nextBtnNum <= totalPageNum ? `<a href="#"></a>` : `<span></span>`}</li>`;
                this.$pageContainer.append(pageString);

                this.pageBtns = this.$pageContainer.find('.page-btn');
                new ButtonActive(this.pageBtns.parent());


                // listItem click
                this.$liContainer.find('.list-title').bind('click', (e) => {
                    e.preventDefault();
                    const id = $(e.currentTarget).data('number');
                    window.location = '#'+id;

                });


                //page btn
                this.pageBtns.bind('click', (e) => {
                    e.preventDefault();

                    this.currentPageNum = e.currentTarget.innerHTML;
                    this.loadList();

                });

                //prev page btn
                this.prevBtn = this.$pageContainer.find('.prev a');
                this.prevBtn.bind('click', (e) => {
                    e.preventDefault();
                    this.currentPageNum = prevBtnNum;
                    this.loadList();
                });


                //next page btn
                this.nextBtn = this.$pageContainer.find('.next a');
                this.nextBtn.bind('click', (e) => {
                    e.preventDefault();
                    this.currentPageNum = nextBtnNum;
                    this.loadList();
                });


            }
        });

    }


}