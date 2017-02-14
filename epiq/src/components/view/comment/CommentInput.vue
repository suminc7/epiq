<template>
    <div class="comment-input form-group" :class="{edit: list}">
        <div class="user-thumb" :style="list ? {backgroundImage: `url(${list.profilePath})`} : {backgroundImage: `url(${epiq.profilePath})`}"></div>
        <div class="input-box">
            <div class="input-editor" v-medium-editor="{ inserted, editableClick, editableBlur, editableInput, placeholder: $t('comment.placeholder')  }"></div>
            <div class="input-control cb">
                <!--<span class="text-len"> <span class="count">{{ inputLenth }}</span> / 500</span>-->
                <div class="btns">
                    <template v-if="list">
                        <a href="#" @click="cancel" class="btn-modify btn-def btn-def-line-block">{{ $t('comment.cancel') }}</a>
                        <a href="#" @click="save" class="btn-modify btn-def btn-def-black" :class="{ disable: isSubmitDisabled }">{{ $t('comment.save') }}</a>
                    </template>
                    <template v-else>
                        <a href="#" @click="submit" class="btn-modify btn-def btn-def-black" :class="{ disable: isSubmitDisabled }">{{ $t('comment.submit') }}</a>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="babel">
	import Vue from 'vue'
	import StringUtil from '../../../utils/String'
    import mediumEditor from '../../../directives/MediumEditor'
	import { mapActions, mapGetters } from 'vuex';
	import * as types from "../../../store/mutation-types";
	import URLS from "../../../utils/urls";

	export default {
		directives: {
			mediumEditor: mediumEditor
		},
        props: {
			list: {
				type: Object
			}
        },
        methods: {
			...mapActions('comment', [
				'newComment',
				'cancelComment',
                'saveComment',
                'modifyComment'
			]),
			submit(){
				this.newComment(this.inputValue).then(() => {
					this.$editor.setContent('');
					this.$editor.origElements.blur();
			    })
				this.isSubmitDisabled = true;
            },
        	save(){
                this.modifyComment({ id: this.list.id, message: this.inputValue })
            },
			cancel(){
                this.cancelComment({});
            },
			editableClick(){
				URLS.goLoginPageWithURL();
            },
            editableBlur(){
            },
            editableInput(value){
            	console.log('editableInput', value);
				this.isSubmitDisabled = value === '<p><br></p>';
            	this.inputValue = value;
            },
			inserted(el){
				if(this.list){
					this.$editor.setContent(`<p>${this.list.comment}</p>`);
					this.isSubmitDisabled = true;
					el.focus();
				}
            }
        },
		data() {
			return {
                editor: null,
				inputValue: '',
				isSubmitDisabled: true,
                epiq: window.epiq
			}
		}
	}
</script>
<style lang="scss">
    @import "../../../../node_modules/medium-editor/src/sass/medium-editor";
    @import "~sass/variables";

    .comment-input {
        &.edit {
            padding: 20px 32px;
            margin-bottom: 0!important;
            .medium-editor-placeholder + .input-control {
                display: block!important;
            }
        }

    }

    .user-thumb {
        width: 48px;
        height: 48px;
        border-radius: 24px;
        background-color: $color-gray6;
        margin-right: 20px;
        float: left;
        background-size: contain;
    }

    .input-box {
        .input-editor {
            min-height: 68px;
            outline: 0;
            font-size: 13px;
            color: $color-title;
            margin-bottom: 10px;
            padding: 10px 15px;
            overflow: hidden;
            white-space: pre-wrap;
            word-wrap: break-word;
        }

    }
    .input-control {
        margin-left: 68px;
        .text-len {
            float: none!important;
        }
        .btns {
            float: right;
            .btn-def {
                display: inline-block;
            }
            a {
                min-width: 66px;
                margin-left: 10px;
            }
        }
    }

    .medium-editor-placeholder:after {
        font-style: normal;
        color: $color-gray2;
    }
    .medium-editor-placeholder + .input-control {
        display: none;

    }



</style>