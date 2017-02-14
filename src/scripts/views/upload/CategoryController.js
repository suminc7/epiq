

export default class CategoryController {
    constructor($obj){



        let arr = [];


        $obj.filter(":checked").each(function() {
            arr.push($(this).val());
        });

			$obj.unbind('click');

        $obj.bind('click', e => {

            const value = $(e.currentTarget).val();

            const findValue = arr.find(x => x === value);
            if(findValue){
                arr = arr.filter(x => x != findValue);
            }else{
                if(arr.length > 2){
                    return false;
                }
                arr.push(value);
            }

        })

    }
}