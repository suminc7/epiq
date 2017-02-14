import DefaultPopup from "../common/DefaultPopup";
import URLS from "../../utils/urls";
import request from "../../utils/apis/request";

export default class ReportPopup extends DefaultPopup {
    constructor(parent){
        super();
        super.element = this.$element = $('#ReportPopup');

        this.parent = parent;

        this.cid = $('#content').data('id');
        this.$completeElement = $('#ReportCompletePopup');
        this.$radioContainer = $('.radio-container ', this.$element);
        this.$radioItem = $('.radio-container input[type=radio]', this.$element);

        this.$reportSubmitBtn = $('#reportSubmitBtn', this.$element);
        this.$completeBtn = $('#completeBtn', this.$completeElement);

        this.init();
    }

    init(){
        this.$completeBtn.bind('click', ()=> {
            this.$completeElement.removeClass('active');
            this.reset();
        });

        this.$radioItem.bind('click', ()=> {
            this.$reportSubmitBtn.removeClass('disable');
        });


        this.$reportSubmitBtn.bind('click', ()=> {

            if(this.$reportSubmitBtn.hasClass('disable')) return;
            this.$reportSubmitBtn.addClass('disable');


            const complaintId = this.$radioItem.filter(':checked').val();
            // `contentId=${this.cid}&complaintId=${complaintId}`
            request(URLS.complaintNew, {contentId: this.cid, complaintId: complaintId}, (data) => {
                if(data.code === 200){
                    this.$element.removeClass('active');
                    this.$completeElement.addClass('active');
                    this.parent.isComplaint = 'Y';
                }
            }, null, 'POST');


        });

    }

    reset(){
        this.$reportSubmitBtn.addClass('disable');
        this.$radioItem.prop('checked', '');
    }

}