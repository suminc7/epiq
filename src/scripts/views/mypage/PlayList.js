



class PlayList {


    constructor() {

        this.tabItem = $('#playList');

        this.init();

    }

    init(){
    }

    active(){
        this.tabItem.addClass('active');
    }

    deactive(){
        this.tabItem.removeClass('active');
    }


}

export default PlayList;