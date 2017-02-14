import {menuActive} from '../common/global';
import {list} from '../utils/apis/list';
import URLS from '../utils/urls';
import ButtonActive from '../components/ButtonActive';
import AppendTemplete from "../components/AppendTemplete";
import BottomMenu from "./footer/BottomMenu";
import VideoListItem from "../templetes/default/VideoListItem";
import ListMore from "./common/ListMore";
import Banner from "./index/Banner";
import ListControlButton from "../components/ListControlButton";
import Const from "../common/Const";
import Category from "./index/Category";
import MainPopup from "./index/MainPopup";




const $listContainer = $('.list-container');
const $listBox = $('.list-box');
const $listTabBtn = $('.list-tab a');



const bottomMenu = new BottomMenu();
const listTabBtn = new ButtonActive($listTabBtn);

let category;



export default class Index {
    constructor(){
        this.option = {offset: 0, size: Const.videoSize};
        this.url = URLS.recommend;
        this.tabItem = $listContainer;
        this.sortBtn = $('.list-control .right-control a', this.tabItem);

        this.init();
    }

    init(){

        $listTabBtn.click((e) => {
            const pid = $(e.currentTarget).data('pid');
            if(pid === 'category'){

                category.active();
                listControlBtn.reset();
                $('.list-control').show();

            }else{
                $('.list-control').hide();
                category.deactive();

                switch (pid) {
                    case 'recommend':
                        this.url = URLS.recommend;
                        break;
                    case 'popular':
                        this.url = URLS.popular;
                        break;
                }

                delete this.option.categoryId;
                this.option.offset = 0;
                this.load();

            }
            e.preventDefault();


        });

        const listControlBtn = new ListControlButton(this);
        new ListMore(this, $listContainer);
        new Banner('HOME');

        category = new Category(this);
        category.start();

        menuActive(0);


//        new MainPopup();

    }

    load(){
        this.loadList(this.url, this.option);
    }

    loadList(url, obj) {
        list(url, obj, (data) => {

            const templete = new AppendTemplete();
            templete.append({
                dataList: data.contentSearchResults,
                element: $listBox,
                ClassItem: VideoListItem,
                listType: 'default',
                option: obj
            });


        });
    };
}

new Index();















