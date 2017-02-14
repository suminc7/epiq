

export default class JqueryPlugins {
    constructor(){


        /**
         * 스크롤 이벤트 전파를 방지하는 플러그인 함수
         */
        $.fn.dontScrollParent = function()
        {
            this.bind('mousewheel DOMMouseScroll',function(e)
            {
                var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;

                if (delta > 0 && $(this).scrollTop() <= 0)
                    return false;
                if (delta < 0 && $(this).scrollTop() >= this.scrollHeight - $(this).height())
                    return false;

                return true;
            });
        };

        $.fn.dontScroll = function(){
            this.on('DOMMouseScroll mousewheel', function(e) {
                if( $(e.currentTarget).is(e.target) ){
                    return false;
                }
            });
        }



    }
}


new JqueryPlugins();