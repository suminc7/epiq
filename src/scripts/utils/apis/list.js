


export const list = (url, option = {}, callback, err) => {

    option.isSearchTotalCnt = 'Y';

    let data = $.param(option);


    $.ajax({
        type: "GET",
        url,
        dataType: "json",
        data,
        contentType: "application/json; charset=UTF-8",
        success: function(data){
            data.url = url;
            callback.call(null, data);
        },
        error: function(req, status, errorText){
            if(req.status === 500){
                const json = $.parseJSON(req.responseText);
                if(err) err.call(null, json);
            }
        }
    });
};




export default list;