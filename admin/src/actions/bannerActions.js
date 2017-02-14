import _ from 'underscore';
import axios from 'axios';
import { ROOT_URL, PAGE_SIZE } from '../constants/pages';
import * as types from './actionTypes';
import { getUtcOffset } from '../utils/DateUtils'

export function fetchBanner(id, isDefault){

	const pageParams = `?id=${id}&isDefault=${isDefault}`;
	const request = axios.get(`${ROOT_URL}/getadminbannerinfo${pageParams}`);
	return {
		type: types.FETCH_BANNER,
		payload: request
	}
}

export function fetchBannerList(pageNumber, bannerArea){

	const pageParams = `?bannerArea=${bannerArea}&offset=${(pageNumber-1) * PAGE_SIZE}&size=${PAGE_SIZE}`;
	const request = axios.get(`${ROOT_URL}/adminlist${pageParams}`);

	return {
		type: types.FETCH_BANNER_LIST,
		payload: request
	}
}

export function deleteBanner(id){

	const pageParams = `id=${id}`;
	const request = axios.post(`${ROOT_URL}/delete`, pageParams);

	return {
		type: types.DELETE_BANNER,
		payload: request
	}
}


export function newBanner(props, type) {


	props.bannerImage = typeof props.bannerImage === 'string' ? null : props.bannerImage[0];

	props.dateStart = parseInt(props.dateStart) - getUtcOffset();
	props.dateEnd = parseInt(props.dateEnd) - getUtcOffset();


	props = _.pick(props, value => !_.isNull(value));

	const data = new FormData();
	for (let key in props){
		data.append(key, props[key]);
	}

	const request = axios.post(`${ROOT_URL}/banner/${type}`, data);

	return {
		type: types.NEW_BANNER,
		payload: request
	}
}



export function fetchOrderList(lang, bannerArea){

	const pageParams = `?bannerArea=${bannerArea}&languageId=${lang}&bannerEnv=WEB`;
	const request = axios.get(`${ROOT_URL}/orderlist${pageParams}`);

	return {
		type: types.FETCH_ORDER_LIST,
		payload: request
	}
}


export function saveOrderList(data){

	const pageParams = `bannerArea=${data.bannerArea}&languageId=${data.languageId}&ids=${data.ids}`;
	const request = axios.post(`${ROOT_URL}/modifyorder`, pageParams);

	return {
		type: types.SAVE_ORDER_LIST,
		payload: request
	}
}










