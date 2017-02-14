

class FaqList {


    constructor(obj) {
        this.obj = obj;
    }

    list(listItem, totalCnt){


        const {
            id,
            title,
            description
        } = listItem;


        return `<div class="faq-item" data-cid="${id}">
                    <span class="faq-mark">Q</span>
                    <span class="faq-subject">${title}</span>
                    <img class="faq-arrow" src="/images/footer/arrow_up.png" alt="내용보기">
                    <div class="faq-content">
                        ${description}
                    </div>
                </div>`;
    }


}

export default FaqList;