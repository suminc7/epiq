import request from "../../utils/apis/request";
import URLS from "../../utils/urls";
import StringUtils from "../../utils/StringUtils";

class Channel {

    constructor() {

        this.$tabItem = $('#channelInfo');

        this.$textArea = $('#userDescription');
        this.$parentItem = this.$textArea.parent();
        this.$modifyBtn = $('.btn-modify');
        this.$confirmBtn = $('.btn-confirm');
        this.$cancelBtn = $('.btn-cancel');

        this.init();
    }

    init(){

        this.$modifyBtn.bind('click', ()=> {
            // const text = this.$textArea.html();
            // this.$parentItem.html(`<textarea id="userDescription">${text}</textarea>`);
            this.$textArea.prop('readonly', '').focus();

            this.$tabItem.addClass('modify');
        });

        this.$confirmBtn.bind('click', ()=> {

            let channelDesc = this.$textArea.val();

            channelDesc = StringUtils.removeTag(channelDesc);
            channelDesc = StringUtils.replaceNewline(channelDesc);
            this.$textArea.val(channelDesc);


            request(URLS.modifyChannelDesc, {
                channelDesc
            }, data => {
                this.modifyChannelDesc();
            }, null, 'POST');
        });

        this.$cancelBtn.bind('click', ()=> {
            this.modifyChannelDesc();
        });
    }

    modifyChannelDesc(){
        // const text = this.$textArea.val();
        // this.$parentItem.html(`<textarea id="userDescription" readonly="readonly">${text}</textarea>`);
        // this.$textArea = $('#userDescription');
        this.$textArea.prop('readonly', 'readonly').blur();
        this.$tabItem.removeClass('modify');
    }

    active(){
        this.$tabItem.addClass('active');
    }

    deactive(){
        this.$tabItem.removeClass('active');
    }


}

export default Channel;