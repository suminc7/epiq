import request from "../../utils/apis/request";
import URLS from "../../utils/urls";




const $afterBtn = $('.after-btn');


export default class Pwdchange {
    constructor(){
			this.init();
    }

    init(){


			$afterBtn.bind('click', e => {

				request(URLS.afterUpdatePasswd, {},
					data => {
						window.location = URLS.rootURL;
					},
					data => {
					},
					'POST');


			});



		}
}