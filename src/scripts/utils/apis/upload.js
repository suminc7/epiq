import URLS from '../urls';


const contentProgress = (contentId, callback) => {

    $.ajax({
        type: "GET",
        url: URLS.contentProgressURL,
        dataType: "json",
        data: {contentId},
        success: function(data){
            callback.call(null, data);
        }
    });
};

export default contentProgress;
