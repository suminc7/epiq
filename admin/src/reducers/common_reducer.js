import { FETCH_CONTENT_LIST } from '../actions/actionTypes';

const INITIAL_STATE = {
	data: {},
	languageItem: {
		ko: '국문',
		en: '영문'
	},
	bannerAreaItem: {
		HOME: '홈',
		CHANNEL: '채널',
		PREMIUM: '프리미엄',
		VRSTAR: 'VR스타'
	}
};

export default function(state = INITIAL_STATE, action){
	switch(action.type) {
		case FETCH_CONTENT_LIST:
			return {...state, data: action.payload.data};
		default:
			return state;
	}
}