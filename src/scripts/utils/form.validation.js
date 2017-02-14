import Locale from "./Locale";
import URLS from "./urls";
import request from "./apis/request";



let _isFocusError = false;
let _checkNicknameValue = '';
let _checkEmailValue = '';

export default class Validation {

    constructor(){
    }


    static checkNicknameApi(nickname, callback){

        request(URLS.checkNickname, `nickname=${nickname}`, (data) => {
            callback.call(this, data);
        }, (data) => {
            callback.call(this, data);
        }, 'GET');

    };

    static checkEmailApi(email, callback){

        request(URLS.checkEmail, `email=${email}`, (data) => {
            callback.call(this, data);
        }, null, 'GET');

    };



    static set isFocusError(val){
        _isFocusError = val;
    }

    static get checkNicknameValue(){
        return _checkNicknameValue;
    }

    static set checkNicknameValue(value){
        _checkNicknameValue = value;
    }

    static get checkEmailValue(){
        return _checkEmailValue;
    }

    static set checkEmailValue(value){
        _checkEmailValue = value;
    }




    static focusError(el, msg, type){
        const clss = type === 'success' ? 'success' : 'alert';
        if(_isFocusError){
            $(el).focus().parents('.form-group').removeClass('success').addClass(clss).children('.error').html(msg);
        }else{
            alert(msg);
            $(el).focus();
        }

    }
    static removeError(el){
        if(_isFocusError) $(el).parents('.form-group').removeClass('alert').removeClass('success');
    }

    /*
     정규식 체크
     */
    //값이 맞는경우: 예) 이메일
    static chk(re, el, msg) {
        if (re.test(el.value)) {
            return false;
        }
        this.focusError(el, msg);
        return true;
    }

    //값이 아닌경우: 예) 채널명 공백
    static chkFalse(re, el, msg) {
        if (re.test(el.value)) {
            this.focusError(el, msg);
            return true;
        }
        return false;

    }

    /*
     빈칸 체크
     */
    static chkSpace(el, msg) {
        let val = el.value;
        if(val.replace(/\s/gi, '') === ''){
            this.focusError(el, msg);
            return true;
        }
        this.removeError(el);
        return false;
    }


    static checkNickname(el){
        if(this.chkSpace(el, Locale.prop('join.done_channel') )){
            return true;
        }else if(this.chkFalse(/\s/gi, el, Locale.prop('join.confirm_space') )){
            return true;
        }else if(el.value.length < 3){
            this.focusError(el, Locale.prop('error.input_less') );
            return true;
        }else{
            this.removeError(el);
            return false;
        }
    }

    static checkEmail(el){

        if(this.chkSpace(el, Locale.prop('join.done_email') )){
            return true;
        }else if(this.chk(/^(.+)@(.+)$/, el, Locale.prop('identify.email_wrong') )){
            return true;
        }else{
            this.removeError(el);
            return false;
        }

    }


    /**
     * 현재 비밀번호를 체크한다.
     * @param el
     * @returns {boolean}
     */
    static checkPassword(el){
        if(this.chkSpace(el, Locale.prop('join.done_password'))){
            return true;
        }else{
            this.removeError(el);
            return false;
        }
    }

    /**
     * 비밀번호를 변경하거나 가입할때 체크한다.
     * @param el
     * @returns {boolean}
     */
    static checkJoinPassword(el){

        //특수문자
        // if(this.chkSpace(el, Locale.prop('join.done_password') )){
        //     return true;
        // }else if(!/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,12}$/.test(el.value)){
        //     this.focusError(el, Locale.prop('join.confirm_wrong_password'));
        //     return true;
        // }else{
        //     this.removeError(el);
        //     return false;
        // }


        // if(this.chkSpace(el, Locale.prop('join.done_password') )){
        //     return true;
        // }else if(!/^[a-zA-Z0-9]{6,12}$/.test(el.value) || el.value.search(/[0-9]/g) < 0 || el.value.search(/[a-z]/ig) < 0){
        //     this.focusError(el, Locale.prop('join.confirm_wrong_password'));
        //     return true;
        // }else{
        //     this.removeError(el);
        //     return false;
        // }

        if(this.chkSpace(el, Locale.prop('join.done_password') )){
            return true;
        }else if(!/^.*(?=^.{6,12}$)(?=.*\d)(?=.*[a-zA-Z]).*$/.test(el.value)){
            this.focusError(el, Locale.prop('join.confirm_wrong_password'));
            return true;
        }else{
            this.removeError(el);
            return false;
        }


    }


    /**
     * 새 비밀번호 입력확인할때 쓴다.
     * @param el
     * @param el2
     * @returns {boolean}
     */
    static checkJoinConfirmPassword(el, el2){
        if(this.chkSpace(el2, Locale.prop('join.done_password') )){
            return true;
        }else if(el.value !== el2.value) {
            this.focusError(el2, Locale.prop('join.confirm_wrong_re_password'));
            return true;
        }else{
            this.removeError(el);
            return false;
        }
    }

    static checkSearch(el){

        if(this.chkSpace(el, Locale.prop('search.input_less'))){
            return true;
        }else if(el.value.length < 2){
            this.focusError(el, Locale.prop('search.input_less'));
            return true;
        }
    }

    static checkInputNickname(element, callback){

        if(this.checkNickname(element)) return;
        this.checkNicknameApi(encodeURIComponent(element.value), (data) => {
            if(data.message === 'SUCCESS'){
                this.focusError(element, Locale.prop('join.confirm_correct_channel'), 'success');
                this.checkNicknameValue = element.value;
                callback.call(null, data);
            }else if(data.message === 'FAIL'){
                this.focusError(element, Locale.prop('join.confirm_same_channel'));
                this.checkNicknameValue = '';
            }else if(data.code === 902){
                this.focusError(element, Locale.prop('join.confirm_prohibited'));
                this.checkNicknameValue = '';
            }

        });
    }



    static checkInputNicknameInSubmit(element){
        if(this.checkNicknameValue != element.value){
            this.focusError(element, Locale.prop('join.confirm_channel_null'));
            return true;
        }
    }

    static checkInputEmailInSubmit(element){
        if(this.checkEmailValue != element.value){
            this.focusError(element, Locale.prop('join.confirm_email_null'));
            return true;
        }
    }

    static checInputEmail(element, callback){

        if(this.checkEmail(element)) return;
        this.checkEmailApi(element.value, (data) => {
            if(data.message === 'SUCCESS'){
                this.focusError(element, Locale.prop('join.confirm_correct_email'), 'success');
                this.checkEmailValue = element.value;
                callback.call(null, data);
            }else if(data.message === 'FAIL'){
                this.focusError(element, Locale.prop('join.confirm_same_email'));
                this.checkEmailValue = '';
            }

        });

    }





}





