
import classes from 'dom-classes';

const vActive = {};

vActive.config = {};

vActive.install = function (Vue, options) {



//	Vue.myGlobalMethod = function () {
//
//	}

	const activeButton = {};

	function active(el, vnode, arg){
		classes.add(el, 'active');
		activeButton[arg] = el;
		vnode.context.activeButton = activeButton;
	}


	Vue.directive('active', {

		bind(el, binding, vnode, oldVnode) {
			const arg = binding.arg || 'current';
			binding.value === vnode.context.current && active(el, vnode, arg);

			el.addEventListener('click', () => {
				activeButton[arg] && classes.remove(activeButton[arg], 'active');
				active(el, vnode, arg);
			})
		}

	})

}

module.exports = vActive;