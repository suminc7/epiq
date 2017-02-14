
export default class Agreement {




    constructor(){

        $('input[type=checkbox]').prop('checked', '');
    }

    init(callback){



        const $checkAgree = $('input[name=agree]');
        const $checkAll = $('#agree6');
        const $agreeSubmit = $('#agreeSubmit');
        const $agree1 = $('#agree1');
        const $agree2 = $('#agree2');
        const $agree3 = $('#agree3');
        const $checkAgree2 = $('input[name=agree2]');
        const $email = this.$email = $('#email');
        const $push = this.$push = $('#push');

        $agree3.bind('click', e => {
            $checkAgree2.prop('checked', e.currentTarget.checked);
        });

        $checkAgree2.bind('click', e => {
            if($email.prop('checked') || $push.prop('checked')){
                $agree3.prop('checked', 'checked');
            }else{
                $agree3.prop('checked', '');
            }
        });


        $checkAgree.bind('click', e => {
            if($agree1.prop('checked') && $agree2.prop('checked')){
                $agreeSubmit.removeClass('disable');
            }else{
                $agreeSubmit.addClass('disable');
            }
        });

        $checkAll.bind('click',e => {
            $checkAgree.prop('checked', e.currentTarget.checked);
            $checkAgree2.prop('checked', e.currentTarget.checked);
            if(e.currentTarget.checked){
                $agreeSubmit.removeClass('disable');
            }else{
                $agreeSubmit.addClass('disable');
            }
        });

        $agreeSubmit.bind('click', e => {
            if(!$agree1.prop('checked') && !$agree2.prop('checked')){
                return;
            }

            callback.call(null);
        });

    }

    get isPush() {
        return this.$push.prop('checked') ? 'Y' : 'N';
    }
    get isEmail() {
        return this.$email.prop('checked') ? 'Y' : 'N';
    }
}
