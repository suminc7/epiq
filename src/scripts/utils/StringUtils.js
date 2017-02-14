

export default class StringUtils {
    constructor(){

    }


    /**
     * 여러개의 줄바꿈을 한개로 변환한다.
     * @param text
     * @returns string
     */
    static replaceNewline(text){
        return text.replace(/\n\s*\n/g, '\n');
    }

    /**
     * 줄바꿈을 스페이스로 변환한다.
     * @param text
     * @returns string
     */
    static removeNewline(text){
        return text.replace(/(\r\n|\n|\r)/gm," ");
    }

    /**
     * 줄바꿈을 <br>로 변환한다.
     * @param text
     * @returns string
     */
    static replaceNewlineTobr(text){
        return text.replace(/(\r\n|\n|\r)/gm,"<br>");
    }

    /**
     * 태그를 삭제한다.
     * @param text
     * @returns string
     */
    static removeTag(text){
        return text.replace(/<\/?[^>]+(>|$)/g, "");
    }

		static decodeHtml(html) {
			const txt = document.createElement("textarea");
			txt.innerHTML = html;
			return txt.value;
		}

    static removeTagAndNewline(text){
        return StringUtils.removeTag(StringUtils.removeNewline(text));
    }

    static removeTagReplaceLine(text){
        return StringUtils.removeTag(StringUtils.replaceNewline(text));
    }

    static getURLParameter(name) {
        //if(getURLParameter('p') == 'event')
        return decodeURI(
            (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
        );
    }

    static titleSubstring(str, len){
        return str.length > len ? str.substring(0, len) + '..' : str;
    }

    static removeDomain(str){
        return str.replace(/.*\/\/[^\/]*/, '');
    }

}