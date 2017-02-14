import Locale from "../../utils/Locale";



class Modify {


    constructor() {

    }

    list(contentId = 0){


        const cid = contentId > 0 ? ` data-cid="${contentId}"` : '';

        const btn1 = Locale.prop('editvideos.edit_btn');
        const btn2 = Locale.prop('editvideos.delete_btn');

        const el = `
        <ul class="modify"${cid}>
            <li class="list-1"><a href="#"><span></span>${btn1}</a></li>
            <li class="list-2"><a href="#"><span></span>${btn2}</a></li>
            <!--<li class="list-3"><a href="#"><span></span>공유하기</a></li>-->
            <!--<li class="list-4"><a href="#"><span></span>플레이리스 담기</a></li>-->
        </ul>`;
        return el;
    }




}

export default Modify;