
import MediumEditor from 'medium-editor'

module.exports = {
	bind: function(el, binding, vNode) {
		


		const editor = new MediumEditor(el, {
			toolbar: false,
			placeholder: {
				text: binding.value.placeholder,
				hideOnClick: true
			}
		});
		vNode.context.$editor = editor;

		editor.subscribe('editableInput', function (event, editable) {
			binding.value.editableInput(editor.getContent())
		});

		editor.subscribe('editableClick', function(){
			binding.value.editableClick();
		});
		editor.subscribe('editableBlur', function(){
			binding.value.editableBlur();
		});
		editor.subscribe('editableKeypress', function(){
			binding.value.editableClick();
		});

	},

	inserted: function (el, binding) {
		binding.value.inserted(el);
	},
}