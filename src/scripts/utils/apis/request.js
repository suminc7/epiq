
import URLS from '../../utils/urls';
import Locale from "../Locale";

const request = (url, data, callback, err = null, method = "POST", contentType) => {

    $.ajax({
        type: method,
        url,
        dataType: "json",
        data,
        contentType,
        success: function(data){
            if(data.code === 200){
                callback.call(this, data);
            }
        },

        /**
         * err 가 있으면 실행하고 없으면 무시한다.
         */
        error: function(req, status, errorText){

            if(req.status === 500){
                const json = $.parseJSON(req.responseText);

                if(json.code === 604){
                    window.location = URLS.loginPageWithURL(window.location.href);
                    return;
                }else if(json.code === 902){
                    if(err){
                        err.call(this, json);
                    }else{
                        alert(Locale.prop('upload.prohibited'));
                    }
                    return;
                }

                if(err) err.call(this, json);

            }

        }
    });
};

export const requestTemplates = (url, data, callback, error = null, method = "GET") => {

    $.ajax({
        type: method,
        url,
        dataType: "html",
        data,
        success: function(data){
            callback.call(this, data);
        },
        error: function(request, status, errorText){
            if(request.status === 500){
                const json = $.parseJSON(request.responseText);

                if(json.code === 604){
                    window.location = URLS.loginPage;
                    return;
                }
            }

        }
    });
};

export default request;
