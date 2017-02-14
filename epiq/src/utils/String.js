

import trim from 'trim';

export default class StringUtils {
    constructor(){

    }





    static replaceComment(text){
		text = text.replace(/<\/p><p>/ig, '\n').replace(/(<([^>]+)>)/ig, '');
		return trim(text)
	}


	static decodeHtml(html) {
    	//todo 수정 필요
		const txt = document.createElement("textarea");
		txt.innerHTML = html;
		return txt.value;
	}

    static getURLParameter(name) {
        //if(getURLParameter('p') == 'event')
        return decodeURI(
            (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
        );
    }

    static removeDomain(str){
        return str.replace(/.*\/\/[^\/]*/, '');
    }

	static getLocaleString(data, str){
		const locale = window.epiq.locale;
		switch (locale){
			case "zh_CN":
			case "en_US":
				return data[locale.split("_")[0] + str[0].toUpperCase() + str.substring(1)];
			default:
				return data[str];
		}
	}

}