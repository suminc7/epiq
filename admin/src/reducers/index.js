import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import common from './common_reducer';
import content from './content_reducer';
import banner from './banner_reducer';
import list from './list_reducer';


const rootReducer = combineReducers({
	common,
	content,
	list,
	banner,
	form: formReducer
});

export default rootReducer;
