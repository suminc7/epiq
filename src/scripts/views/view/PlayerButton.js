import URLS from "../../utils/urls";
import Locale from "../../utils/Locale";
import ReportPopup from "./ReportPopup";
import Cookie from "../../utils/Cookie";
import ResolutionButton from "./ResolutionButton";


let $sideMenu;
let $videoJS;


/**
 * resolution Btn
 */


let $topMenu;

let resolutionBtn;


export default class PlayerButton {
	constructor(data, state) {

		this.contentData = data;
		this.state = state;

		this.volume = Cookie.getCookie('content_volume');


		$sideMenu = $('.content-side-menu');
		

		$videoJS = $('.video-js');
		$videoJS.append(`<div class="top-menu"></div>`);
		$topMenu = $('.top-menu').append($sideMenu);

		resolutionBtn = new ResolutionButton(this.contentData, this.state);
		resolutionBtn.init($videoJS);


		this.initReportBtn();

		$videoJS.find('.vjs-control-bar').prepend(`<div class="vjs-shadow-bottom"></div>`);
	}


	initVolume(){


		resolutionBtn.orderVolumeBtn($('.vjs-volume-menu-button'));

		if(this.volume && this.volume >= 0){
			this.state.player.volume(this.volume);
		}

		this.state.player.on('volumechange', ()=> {
			Cookie.setCookie('content_volume', this.state.player.volume());
		});
	}

	initReportBtn(){


		const reportPopup = new ReportPopup(this);

		$sideMenu.find('.report').bind('click', e => {
			URLS.goLoginPageWithURL(window.location.href);


			if(this.contentData.isComplaint === 'Y'){
				alert(Locale.prop('report.before'));
				return;
			}

			if(epiq.isLogin === "Y"){
				reportPopup.show();
			}

		});


	}

	
}