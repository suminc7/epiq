

export default class Const {
    constructor(){

    }


    static get domain(){
        return 'epiqvr.com';
    }

    static get channelSize(){
        return 3;
    }
    static get channelListSize(){
        return 10;
    }
    static get videoSize(){
        return 16;
    }
    static get slideVideoSize(){
        return 4;
    }
    static get slideNextVideoSize(){
        return 3;
    }

    static get rankListSize(){
        return 10;
    }
    static get followListSize(){
        return 10;
    }
    static get faqListSize(){
        return 10;
    }
    static get viewRecommendSize(){
        return 5;
    }

    static get minSliderContentSize(){
        return 3;
    }

    static get channelSubstringLen(){
        return 12;
    }

    static get maxDefaultWidth(){
        return 1440;
    }

    static get minDefaultWidth(){
        return 1080;
    }




    static get maxCategoryWidth(){
        return this.maxDefaultWidth;
    }

    static get minCategoryWidth(){
        return this.minDefaultWidth - 120;
    }

    static get maxCateNum(){
        return 12;
    }

    static get minCateNum(){
        return 8;
    }

}