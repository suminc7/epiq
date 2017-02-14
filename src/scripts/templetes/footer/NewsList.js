import {getDate} from '../../utils/date';

class NewsList {


    constructor(obj) {
        this.obj = obj;
    }

    list(listItem, totalCnt){


        const {
            id,
            number,
            title,
            dateUpdated
        } = listItem;


        const date = getDate(dateUpdated);
        return `<tr>
                    <td>${number}</td>
                    <td><a href="#" data-number="${number}" class="list-title">${title}</a></td>
                    <td>${date}</td>
                </tr>`;
    }


}

export default NewsList;