import {} from '../common/global';
import {list} from '../utils/apis/list';
import URLS from '../utils/urls';
import ViewRecommend from "../templetes/mypage/ViewRecommend";
import Player from './view/player';
import AppendTemplete from "../components/AppendTemplete";
import request from "../utils/apis/request";
import Const from "../common/Const";
import ContentMeta from "../templetes/view/ContentMeta";
import SnsPopup from "./view/SnsPopup";
import ListItemProxy from "../utils/ListItemProxy";
import LikeButton from "../components/LikeButton";

const contentId = $('#content').data('id');
const $lists = $('.list');
const $infoHead = $('.video-info-head');
const $desc = $('.video-detail .description');

let $snsBtn;


const $likeBtn = $('a.like');
const likeBtn = new LikeButton( $likeBtn );


export default class View {
	constructor(){
		this.option = {contentId: contentId, offset: 0, size: Const.viewRecommendSize};

		this.init();
		this.load();
	}

	init(){

		request(URLS.contentGetContent, {
			contentId
		}, (data) => {
			this.initContentInfo(data);
			this.player = new Player(data);

		}, (data) => {
		}, 'GET');

		request(URLS.contentViewCount, {
			contentId
		}, (data) => {
		}, (data) => {
		}, 'POST');







	}


	initContentInfo(data){


		// content 정보 설정
		const item = new ContentMeta().list(data);
		$infoHead.append(item);


		const lip = new ListItemProxy(data);
		$desc.html(lip.description);


		//sns 팝업
		let snsPopup;
		$snsBtn = $('.sns-btn');
		$snsBtn.bind('click', ()=> {
			if(!snsPopup) snsPopup = new SnsPopup();
			snsPopup.show();
		});
	}


	load(){
		this.loadList(URLS.contentrecommend, this.option);
	}

	loadList(url, obj) {
		list(url, obj, (data) => {

			const templete = new AppendTemplete();
			templete.append({
				dataList: data.contentSearchResults,
				element: $lists,
				ClassItem: ViewRecommend,
				listType: 'default',
				option: obj
			});



		});
	}
}

new View();