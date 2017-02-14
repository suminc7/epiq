import ButtonActive from "./ButtonActive";


class ListTabButton {


    constructor($obj, tabList) {


        let currentTabItem;
        new ButtonActive($obj);

        $obj.bind('click', function(){
            if(currentTabItem) currentTabItem.deactive();
            const pid = $(this).data('pid');
            const tabItem = tabList[pid];
            tabItem.active();
            currentTabItem = tabItem;
        });


        window.onhashchange = () => {
            var currentHash = window.location.hash;
            var hash = '';

            if(currentHash.length > 1 && tabList[currentHash.substring(1)]){
                hash = currentHash.substring(1);
                $obj.removeClass('active');
                const $btn = $obj.filter(`[data-pid=${hash}]`);
                $btn.trigger('click');

            }else{
                const $btn = $obj.filter('.active');
                $btn.trigger('click');
            }

        };
        window.onhashchange();









        this.init();
    }

    init(){

    }
}

export default ListTabButton;