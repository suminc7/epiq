

export default class FaqMenuList {
    constructor(obj){
        this.obj = obj;
    }

    list(listItem){


        let firstMenuItems = '';
        let subMenuItems = '';
        for (const item of listItem) {
            const {
                firstMenuName,
                firstMenuId,
                secondMenuList
            } = item;

            firstMenuItems += `<a href="#" data-cid="${firstMenuId}">${firstMenuName}</a>`;


            subMenuItems += `<div class="submenu-circle">`;
            for (const subItem of secondMenuList){
                subMenuItems += `<a href="#" data-cid="${subItem.id}">${subItem.name}</a>`;
            }
            subMenuItems += `</div>`;


        }

        return `<div class="submenu">
                    ${firstMenuItems}
                </div>
                ${subMenuItems}`;


    }
}