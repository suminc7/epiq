import HashController from "../common/HashController";

export default class NewsHashController extends HashController {
    constructor(view, viewItem){
        super();
        window.onhashchange = () => {
            var newHash = window.location.hash;
            $(document).scrollTop(0);
            if(newHash === '' || newHash === '#list'){
                view.onList();
            }else{
                viewItem.loadContent( newHash.substring(1) );
            }
            // if(newHash != originalHash){
            //
            // }
        };
        window.onhashchange();
    }
}