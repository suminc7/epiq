import {authKey} from './encrypt';


export default class Locale {



    constructor() {
        this.init();
    }

    init() {
        this.i18n = $.i18n;
    }

    load(name, callback){
        $.i18n.properties({
            name,
            path:'/locale/',
            mode:'map',
            language: epiq.lang,
            data:{propDir: '', salt:authKey(), propName: epiq.lang},
            callback: function (data) {
                if(callback) callback.call(this, data);
            }
        });
    }

    static prop(value){
        return $.i18n.prop(value);
    }


}

