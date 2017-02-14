import Locale from "../../utils/Locale";

export default class ListControlButton {
    constructor(){

    }

    element(){
        return `<div class="list-control cb">
                    <div class="right-control">
                        <a href="#" data-pid="recently" class="sort-recent active">
                            <span class="icon-check"></span>
                        ${ Locale.prop('common.sort_newest') }
                        </a>
                        <a href="#" data-pid="popular" class="sort-like">
                            <span class="icon-check"></span>
                        ${ Locale.prop('common.sort_hottest') }
                        </a>
                        <a href="#" data-pid="title" class="sort-title">
                            <span class="icon-check"></span>
                        ${ Locale.prop('common.sort_name') }
                        </a>
                    </div>
                </div>`;
    }
}