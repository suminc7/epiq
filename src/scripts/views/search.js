import {} from '../common/global';
import All from "./search/All";
import Videos from "./search/Videos";
import Channel from "./search/Channel";
import ListTabButton from "../components/ListTabButton";

export default class Search {

    constructor() {
        this.listTabBtn = $('.list-tab a');
        this.keyword = $('span.title').html();
        this.init();
    }

    init() {

        this.tabList = {
            all: new All(this.keyword),
            videos: new Videos(this.keyword),
            channel: new Channel(this.keyword)
        };

        new ListTabButton(this.listTabBtn, this.tabList);
    }
}
new Search();