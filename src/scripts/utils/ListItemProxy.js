import StringUtils from "./StringUtils";


export default class ListItemProxy {



    constructor(data){

        this.data = data;

    }

    static getLocaleString(data, str){
        const locale = epiq.locale;
        switch (locale){
            case "zh_CN":
            case "en_US":
                return data[locale.split("_")[0] + str[0].toUpperCase() + str.substring(1)];
            default:
                return data[str];
        }
    }

    static getProfile(data){
        return data.length > 0 ? ` style="background-image: url(${data[0].profilePath})"` : '';
    }

    get profileImage(){
        return this.data.userProfileDtoList[0].profilePath;
    }

    get styleWithProfileImage(){
        return this.data.userProfileDtoList.length > 0 ? ` style="background-image: url(${this.profileImage})"` : '';
    }

    get styleWithLock(){
        return this.data.publicType === 'PRIVATE' ? ` class="lock"` : ``;
    }

    get title(){
        return this.data.title;
    }

    get description(){
        return StringUtils.replaceNewlineTobr(this.data.description);
    }

}