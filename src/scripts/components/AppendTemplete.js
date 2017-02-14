
let count = 1;

export default class AppendTemplete {


    constructor() {
    }

    append(object){


        const {
            dataList,
            element,
            ClassItem,
            listType,
            option
        } = object;


        //console.log(dataList.length === 0 , typeof dataList === 'object', dataList.length === undefined, element);
        if(dataList.length === 0){
            element.trigger('appended', 0);
            return;
        }


        //more btn 클릭시 리셋 방지를 위해 추가
        if(option.offset === 0 || option.channelOffset === 0){
            count = 0;
            element.html('');
        }

        let lists = '';


        //console.log(typeof dataList);
        //search 페이지 All 로 인한 추가, 1개 일때
        if(dataList.length === undefined){
            lists += this.getList(dataList, ClassItem, listType, 0);
        }else{
            for (let list of dataList) {
                lists += this.getList(list, ClassItem, listType, count++);
            }
        }



        element.append(lists);
        element.trigger('appended', dataList.length);
    };

    getList(list, ClassItem, listType, count){
        const listItem = new ClassItem({listType});
        return listItem.list(list, count);
    };


}