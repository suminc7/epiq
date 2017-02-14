



class Checkbox {


    constructor() {

    }

    list(contentId){

        const el = `
            <span class="checkbox">
                <input id="check${contentId}" type="checkbox"><label for="check${contentId}" class="checkbox-label"></label>
            </span>`;
        return el;
    }


}

export default Checkbox;