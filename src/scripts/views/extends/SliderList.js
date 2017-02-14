import Const from "../../common/Const";



export  default class SliderList {


    constructor(element, loadSliderList, data){
        this.$element = element;
        this.loadSliderList = loadSliderList;
        this.data = data;
        this.initChannels();
    }

    initChannels(){


        this.$element.on({
            click: (e)=> {

                const $element = this.$element = $(e.currentTarget).parents('.channel-item');
                const contentTotal = $element.data('contenttotal');
                const searchItem = $element.data('search-item');
                const totalPage = Math.floor(contentTotal / Const.slideNextVideoSize) + (contentTotal % Const.slideNextVideoSize > 0 ? 1 : 0);
                const loaded = $element.data('loaded') || 0;


                let arrowCount = $element.data('arrowCount') || 0;
                arrowCount--;
                $element.data('arrowCount', arrowCount);

                const size = loaded === 0 ? Const.slideVideoSize : Const.slideNextVideoSize;
                const offset = -arrowCount * size;

                if(offset < contentTotal){

                    // 이미 로딩된 컨텐츠는 로딩하지 않는다.
                    if(offset > loaded){
                        this.loadSliderList($element, offset, this.data, searchItem);
                    }

                    const maxLoaded = Math.max(loaded, offset);
                    $element.data('loaded', maxLoaded);

                }


                TweenMax.to($(e.currentTarget).parent().find('.list-body'), 0.6, {x:360 * Const.slideNextVideoSize * arrowCount, ease:Power2.easeInOut});


                if(totalPage <= -1 * arrowCount + 1){
                    $(e.currentTarget).removeClass('active');
                }
                $element.find('.list-arrow-left').addClass('active');


                e.preventDefault();
            }
        }, '.channel-item .list-arrow-right');

        this.$element.on({
            click: (e)=> {
                const $element = $(e.currentTarget).parents('.channel-item');

                let arrowCount = $element.data('arrowCount') || 0;
                arrowCount++;
                if(arrowCount > 0){
                    arrowCount = 0;
                }


                $element.data('arrowCount', arrowCount);
                TweenMax.to($(e.currentTarget).parent().find('.list-body'), 0.6, {x:360 * Const.slideNextVideoSize * arrowCount, ease:Power2.easeInOut});

                if(arrowCount === 0){
                    $(e.currentTarget).removeClass('active');
                }
                $element.find('.list-arrow-right').addClass('active');

                e.preventDefault();
            }
        }, '.channel-item .list-arrow-left');



    }

    // loadList(url, obj, container){
    //     list(url, obj, (data) => {
    //         if(data.contentSearchResults.length > 0){
    //
    //             const templete = new AppendTemplete();
    //             templete.append({
    //                 dataList: data.contentSearchResults,
    //                 element: container,
    //                 ClassItem: VideoListItem,
    //                 listType: 'default',
    //                 option: obj
    //             });
    //
    //
    //
    //         }else{
    //
    //         }
    //     });
    // }
}