
import Validation from "../../utils/form.validation";
import request from "../../utils/apis/request";
import URLS from "../../utils/urls";
import encrypt from "../../utils/encrypt";
import Locale from "../../utils/Locale";

export default class ViewPassword {
    constructor() {
        this.init();

        this.currentPassword = $('#currentPassword');
        this.newPassword = $('#newPassword');
        this.newPasswordConfirm = $('#newPasswordConfirm');
    }

    init() {
        $('.default-list-tab a[data-pid=password]').addClass('active');


        const _this = this;


        $('#submitBtn').bind('click', (e)=> {

            if(Validation.checkPassword(this.currentPassword[0])){
                return;
            }
            if(Validation.checkJoinPassword(this.newPassword[0])){
                return;
            }

            if(Validation.checkJoinConfirmPassword(this.newPassword[0], this.newPasswordConfirm[0])){
                return;
            }

            const currentPassword = encrypt(this.currentPassword.val());
            const newPassword = encrypt(this.newPassword.val());


            $(e.currentTarget).addClass('disable');


            request(URLS.changePassword, {
                oldPassword: currentPassword,
                newPassword: newPassword
            }, function(data){
                if(data.message === 'SUCCESS'){
                    alert(Locale.prop('changepwd.done'));
                    window.location = URLS.viewMypage;
                }
            }, function error(data){
                if(data.code === 607){
                    Validation.focusError(_this.currentPassword[0], Locale.prop('changepwd.now_wrong'));
                }
            }, 'POST');


        });




    }
}