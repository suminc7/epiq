import Vue from 'vue'
import Comment from './components/view/comment/Comment.vue'
import Popup from './components/common/popup/Popup.vue'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import i18n from './plugins/i18n'
import './filters'

Vue.use(VueAxios, axios);
Vue.use(i18n);

new Vue({
	el: '#comment',
	store,
	render: h => h(Comment)
})

const wrap = document.getElementById('wrap');
const popup = document.createElement('div');
popup.id = 'popup';
wrap.appendChild(popup);

new Vue({
	el: '#popup',
	store,
	render: h => h(Popup)
})
