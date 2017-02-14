import request from "../../utils/apis/request";
import URLS from "../../utils/urls";
import Validation from "../../utils/form.validation";
import encrypt from "../../utils/encrypt";
import StringUtils from "../../utils/StringUtils";
import Locale from "../../utils/Locale";
import Cookie from "../../utils/Cookie";

export default class ViewLeave {
    constructor() {

        this.checkedRadio = $('input[name=reason]');
        this.reason = $('.reason');
        this.agree = $('.agree');
        this.complete = $('.complete');
        this.passInput = $('#myPassword');
        this.reasonText = $('#reasonText');

        this.init();
        this.initSubmit();


    }

    init() {
        $('.default-list-tab a[data-pid=leave]').addClass('active');


    }


    initSubmit() {

        const _this = this;

        $('#nextBtn').click(function(e){
            e.preventDefault();


        });


        $('#submitBtn').click(function(e){
            e.preventDefault();

            const $btn = $(e.currentTarget);


            if(_this.passInput.length > 0){
                if(Validation.checkPassword( _this.passInput[0] )){
                    return;
                }
            }


            const value = _this.checkedRadio.filter(':checked').val();



            if(parseInt(value) === 6){
                if(Validation.chkSpace(_this.reasonText[0], Locale.prop('delaccount.reason_input_null'))){
                    return false;
                }
            }

            if(value > 0 && value < 7){
            }else{
                alert(Locale.prop('delaccount.reason_null'));
                return;
            }


            if($('#LeaveAgree:checked').val() != "Y"){
                alert(Locale.prop('delaccount.confirm_null'));
                return;
            }



            $btn.addClass('disable');

            const reasonValue = StringUtils.removeTagAndNewline(_this.reasonText.val());
            let password = '';
            if(_this.passInput.length > 0){
                password = encrypt( _this.passInput.val() );
            }


            const obj = {
                dropOutReasonTypeId: value
            };

            if(password != ''){
                obj.password = password;
            }
            if(value === '6'){
                obj.dropReasonText = reasonValue;
            }

            request(URLS.userLeave, obj, function(data){
                if(data.message === 'SUCCESS'){
                    request(URLS.logout, {}, function(data){
												Cookie.setCookie('xauth', '', -1);
                        _this.agree.hide();
                        _this.reason.hide();
                        _this.complete.show();
                    }, null, 'GET');
                }
            }, function error(data){
                if(data.code === 607){
                    Validation.focusError(_this.passInput[0], Locale.prop('changepwd.now_wrong'));
                }
                $btn.removeClass('disable');
            }, 'POST');


        });

    }
}