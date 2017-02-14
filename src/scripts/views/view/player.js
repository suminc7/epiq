import _ from 'underscore';
import loadjs from 'loadjs';
import PlayerButton from "./PlayerButton";
import GuidePopup from "./GuidePopup";
import URLS from "../../utils/urls";
import request from "../../utils/apis/request";


const $browser = $.browser;

let playerButton;
let guidePopup;
let isPlaying;

export default class Player {
	constructor(data){

		this.contentData = data;

		this.$player = $('#player');

		this.isMp4 = $browser.msie || $browser.mozilla || this.webglCheck();
		this.isFlash = $browser.msie;
		this.isDefault = $browser.safari;

		this.state = {player: null, isMp4: this.isMp4, resolutionType: '1080p'};

		if(this.isDefault){
			this.isFlash = false;
			this.isMp4 = false;
		}



		if(this.isMp4){
			this.initPlayer();
		}else{
			loadjs([
				`${epiq.resourcePath}/js/libs/videojs-contrib-hls.min.js`
			], {
				success: ()=> {
					this.initPlayer();
				}
			});
		}


	}

	appendVideo(){
		guidePopup = new GuidePopup();

		const { contentChildDtoList, path: mp4URL } = this.contentData;
		const hlsURL = contentChildDtoList.find(arr => arr.resolution === this.state.resolutionType).path;

		const video = `<video id="videoPlayer" class="video-js vjs-sublime-skin" controls playsinline preload="auto" width="940" height="529" crossorigin="anonymous" data-setup='{}'>
					${this.isMp4 ? `<source src="${mp4URL}" type="video/mp4">` : `<source src="${hlsURL}" type="application/x-mpegURL">`}
					<p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
			</video>
			${guidePopup.el()}`;

		this.$player.append(video);

		guidePopup.init();
	}


	/**
	 * init player
	 */
	init(){




		videojs.options.flash.swf = epiq.resourcePath+'/images/swf/video-js.swf';
		const options = {
			techOrder: this.isFlash ? ['flash'] : ['html5']
		};


		this.state.player = this.player = videojs('videoPlayer', options, ()=>{
			if(this.isFlash || this.isDefault) {
				this.play();
			}
			this.player.removeTechControlsListeners_();


		});






		this.player.on('error', (e) => {
			// console.log(e);

			// console.log("22", this.player.errorDisplay);

			// $(this.player.errorDisplay.contentEl_).html('123');
			// $(this.player.errorDisplay.contentEl_).html('123');

			// this.player.error({code:4, message: '123'});

			// e.stopImmediatePropagation();
			// var error = this.player.error();
			// console.log('error!', error.code, error.type , error.message);
		});



		this.player.on(['waiting', 'pause'], function() {
			isPlaying = false;
			// console.log(isPlaying);
		});

		this.player.on('playing', function() {
			isPlaying = true;
			// console.log(isPlaying);
		});


		this.initPanorama();


	}

	initPanorama(){

		if(!this.isFlash && !this.isDefault){
			loadjs([
				`${epiq.resourcePath}/js/libs/three.min.js`,
				`${epiq.resourcePath}/js/libs/videojs-panorama.v5.min.js`
			], {
				success: ()=> {
					this.player.panorama({
						showNotice: false,
						clickAndDrag: true,
						backToVerticalCenter: false,
						backToHorizonCenter: false,
						scrollable: false,
						callback: () => {

							setTimeout(() => {
								this.play();
							}, 500);
						}

					});
				}
			});

		}
	}



	timeRequest(currentTime, duration){
		if(currentTime > duration) return;
		request(URLS.recentlyNew, {
			contentId: this.contentData.contentId,
			seconds: currentTime,
			totalSeconds: duration
		}, function(data){

		}, null);
	}


	callTime(){
		if(epiq.isLogin === "Y"){



			// const time = Math.floor(duration / 5);
			//
			// let timeArr = [];
			// for(let i = 0;i < 5;i++){
			//     timeArr.push(time * i);
			// }

			const _this = this;
			const callInterval = () => {

				if(!isPlaying) return;

				const duration = Math.floor(this.player.duration());
				const currentTime = Math.floor(this.player.currentTime());

				if( _.isNumber(duration) && _.isNumber(currentTime) ){
					_this.timeRequest(currentTime, duration);
				}else{
					_this.timeRequest(0, 0);
				}

			};
			_this.timeRequest(0, 0);
			setInterval(callInterval, 10000);
		}

	}




	initPlayer(){
		this.appendVideo();
		this.init();
		playerButton = new PlayerButton(this.contentData, this.state);
	}

	play(){
		this.callTime();
		this.player.play();
		playerButton.initVolume();
	}


	/**
	 * OES_texture_half_float, OES_texture_half_float_linear를 지원하지 않는 브라우저를 체크한다.
	 * @return {boolean}
	 */
	webglCheck() {

		let gl = null;

		$('body').append(`<canvas id="glcanvas" width="0" height="0"></canvas>`);
		var canvas = document.getElementById("glcanvas");


		try {
			// Try to grab the standard context. If it fails, fallback to experimental.
			gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
		}
		catch(e) {}



		if (gl) {
			let isTest = false;
			if(!gl.getExtension("OES_texture_half_float") || !gl.getExtension("OES_texture_half_float_linear")){
				isTest = true;
			}

			$('#glcanvas').remove();
			return isTest;
		}
	}



}
