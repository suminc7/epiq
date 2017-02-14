import request from "../../utils/apis/request";
import URLS from "../../utils/urls";
import Validation from "../../utils/form.validation";
import {snsLoginKey} from "../../utils/encrypt";
import Locale from "../../utils/Locale";

export default class Identify {


    constructor(){

        this.$auth = $('.auth');
        this.$inputEmail = $('#InputEmail');
        this.$sendBtn = $('#sendBtn');
        this.$reSendBtn = $('#reSendBtn');
        this.emailValue = '';

        this.init();
    }

    init(){

        this.$sendBtn.bind('click', (e) => {

            if(this.$sendBtn.hasClass('disable')) return;
            this.$sendBtn.addClass('disable');
            e.preventDefault();
            this.sendEmail();


        });


        this.$reSendBtn.bind('click', (e)=> {
            if(this.$reSendBtn.hasClass('disable')) return;
            this.$reSendBtn.addClass('disable');
            this.sendEmail();
            e.preventDefault();
        });



    }

    sendEmail(){
        this.emailValue = this.$inputEmail.val();

        if( Validation.checkEmail(this.$inputEmail[0]) ) return;
        request(URLS.reAuthorization, {
                email: this.emailValue,
                salt: snsLoginKey( this.emailValue )
            },
            data => {

                if(data.message === 'SUCCESS'){
                    this.$auth.addClass('resend');
                    this.$sendBtn.removeClass('disable');
                    this.$reSendBtn.removeClass('disable');
                }

            }, data => {
                if(data.code === 605){
                    alert( Locale.prop('auth.email_null') );
                }
                this.$sendBtn.removeClass('disable');
                this.$reSendBtn.removeClass('disable');

            }, 'POST');
    }
}
