import ChannelSliderListWrap from "../channel/ChannelSliderListWrap";
import Locale from "../../utils/Locale";


class SearchAll {


    constructor(obj) {
        this.obj = obj;
        this.listType = this.obj.listType;
    }

    list(listItem){

        let {
            contentSearchResults,
            channelSearchResults,
            channelTotalCnt,
            contentTotalCnt
        } = listItem;

        let listLength = '';
        let channelListWrap = null;
        let total = 0;
        let searchItem = '';
        let href = '';

        if(this.listType === 'videos'){
            listLength = `${Locale.prop('search.videos')} <span class="leng-item">${contentTotalCnt}</span>`;
            channelListWrap = new ChannelSliderListWrap(this.obj).list(contentSearchResults);
            total = contentTotalCnt;
            searchItem = 'CONTENT';
            href = '#videos';
        }else if(this.listType === 'userChannel'){
            listLength = `${Locale.prop('search.channel')} <span class="leng-item">${channelTotalCnt}</span>`;
            channelListWrap = new ChannelSliderListWrap(this.obj).list(channelSearchResults);
            total = channelTotalCnt;
            searchItem = 'CHANNEL';
            href = '#channel';
        }




        return `<li class="channel-item" data-contenttotal="${total}" data-search-item="${searchItem}">
                    <div class="list-length">${listLength}<a href="${href}" class="more-btn">${Locale.prop('search.more')}</a></div>
                    <div class="line"></div>
                    ${channelListWrap}
                </li>`;
    }


}

export default SearchAll;