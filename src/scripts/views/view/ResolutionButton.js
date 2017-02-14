import ButtonActive from "../../components/ButtonActive";

let interval;
let $resolutionMenu;
let $resolutionMenuBtn;
let $settingBtn;

export default class ResolutionButton {
	constructor(data, state){
		this.contentData = data;
		this.state = state;
	}

	el(){

		const {
			contentChildDtoList : lists
		} = this.contentData;


		let listItem = '';
		for (const list of lists){
			const {path, resolution} = list;
			listItem += `<li><a href="#" data-path="${path}">${resolution}</a></li>`;
		}

		return `<ul class="resolution-menu">
							${listItem}
						</ul>`;
	}

	init($container){
		$container.append(this.el());

		this.initSettingBtn();
		this.initResolution();

	}

	get settingBtn(){
		return $settingBtn;
	}

	get resolutionMenu(){
		return $resolutionMenu;
	}

	get resolutionMenuBtn(){
		return $resolutionMenuBtn;
	}

	setResolution(){

	}

	orderVolumeBtn($element){
		$settingBtn.before($element);
	}

	initSettingBtn(){

		const { player } = this.state;

		const myButton = player.controlBar.addChild('Button', {}, 10);
		myButton.addClass('vjs-setting-menu-button');
		myButton.on('click',function(){
		});

		$settingBtn = $('.vjs-setting-menu-button');

		$settingBtn.bind({
			'mouseenter': e => {
				$resolutionMenu.show();
			},
			'mouseleave': e => {
				interval = setTimeout(() => $resolutionMenu.hide(), 100);
			}
		});
	}


	initResolution(){

		const { contentChildDtoList } = this.contentData;
		const { player, isMp4, resolutionType } = this.state;

		$resolutionMenu = $('.resolution-menu');
		$resolutionMenuBtn = $resolutionMenu.find('a');

		$resolutionMenu.bind({
			'mouseenter': e => {
				clearInterval(interval);
				$resolutionMenu.show();
			},
			'mouseleave': e => {
				$resolutionMenu.hide();
			}
		});



		const resolutionIndex = contentChildDtoList.findIndex(el => el.resolution === resolutionType);

		$resolutionMenuBtn.bind('click', e => {
			const $target = $(e.currentTarget);
			if($target.hasClass('active')) return;
			const path = $target.data('path');
			const currentTime = player.currentTime();
			player.src({"type":"application/x-mpegURL", "src":path});
			player.play();
			player.currentTime(currentTime);
		});

		new ButtonActive($resolutionMenuBtn, resolutionIndex);

		if(isMp4){
			$resolutionMenuBtn.each(function(i){
				if(i != resolutionIndex){
					$(this).remove();
				}
			});
		}


	}


}