


import axios from 'axios';
import { ROOT_URL, PAGE_SIZE } from '../constants/pages';
import {
	FETCH_CONTENT_LIST,
	UPDATE_PREMIUM_LIST
} from './actionTypes';


export function fetchContentList(listType = '', pageNumber){

	const pageParams = `?data=&type=0&offset=${(pageNumber-1) * PAGE_SIZE}&size=${PAGE_SIZE}`;
	const request = axios.get(`${ROOT_URL}/${listType}/list${pageParams}`);

	return {
		type: FETCH_CONTENT_LIST,
		payload: request
	}
}


export function fetchContent(contentId) {
	const request = axios.post(`${ROOT_URL}/search_content`, `contentId=${contentId}`);

	return {
		type: FETCH_CONTENT_LIST,
		payload: request
	}
}

export function updatePremiumList(confirmId, isConfirmAdmin) {
	const request = axios.post(`${ROOT_URL}/premium/update`, `id=${confirmId}&isConfirmAdmin=${isConfirmAdmin}`);

	return {
		type: UPDATE_PREMIUM_LIST,
		payload: request
	}
}




