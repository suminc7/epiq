import { FETCH_CONTENT_LIST } from '../actions/actionTypes';

const INITIAL_STATE = {
    data: {}
};

export default function(state = INITIAL_STATE, action){
    switch(action.type) {
        case FETCH_CONTENT_LIST:
            return {...state, data: action.payload.data};
        default:
            return state;
    }
}