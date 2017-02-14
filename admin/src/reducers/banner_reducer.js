import _ from 'underscore';
import { NEW_BANNER, FETCH_BANNER_LIST, FETCH_BANNER, FETCH_ORDER_LIST } from '../actions/actionTypes';
import { getUtcOffset, getMillisecond } from '../utils/DateUtils'

const INITIAL_STATE = {
	data: {},
	list: {},
	orderlist: {},

	defaultItem: {
		bannerEnv: 'WEB',
		bannerType: 'BANNER',
		dateStart: getMillisecond(),
		dateEnd: getMillisecond(),
	},
	item: {
		bannerEnv: 'WEB',
		bannerType: 'BANNER',
		bannerName: null,
		bannerActivation: null,
		bannerArea: [],
		bannerMarkId: null,
		languageId: null,
		bannerTitle: null,
		bannerDescFirst: null,
		bannerDescSecond: null,
		bannerDescThird: null,
		linkAction: null,
		linkUrl: null,
		dateStart: 0,
		dateEnd: 0,
		bannerImage: null
	}
};


export default function(state = INITIAL_STATE, action){

	switch(action.type) {
		case NEW_BANNER:
			return {...state, data: action.payload.data};
		case FETCH_BANNER_LIST:
			return {...state, list: action.payload.data};
		case FETCH_BANNER:
			let {
				bannerArea,
				bannerImagePath,
				dateStart,
				dateEnd
			} = action.payload.data;

			action.payload.data = {
				...action.payload.data,
				bannerArea: bannerArea.map(element => element.bannerArea),
				bannerImage: bannerImagePath,
				dateStart: parseInt(dateStart) + getUtcOffset(),
				dateEnd: parseInt(dateEnd) + getUtcOffset()
			};

			const keys = _.keys(state.item);

			return {
				...state,
				item: _.pick(action.payload.data, [...keys, 'id', 'isDefault'])
			};

		case FETCH_ORDER_LIST:
			let {
				adminBannerList
			} = action.payload.data;

			const currentDate = getMillisecond();
			action.payload.data.adminBannerList = _.filter( adminBannerList, item => getUtcOffset(item.dateStart) <= currentDate && currentDate < getUtcOffset(item.dateEnd) );


			return {...state, orderlist: action.payload.data};
		default:
			return {...state};
	}
}