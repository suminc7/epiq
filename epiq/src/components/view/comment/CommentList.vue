<template>
    <li class="comment-list">
        <div class="inner">
            <a class="user-thumb" href="#" :href="userLink" :style="list && {backgroundImage: `url(${list.profilePath})`}"></a>
            <div class="comment-content">
                <div class="comment-content-header" v-if="!list.deleted">
                    <a href="#" :href="userLink" class="comment-author" :class="{creator: list.creator}">{{ list.nickname }}</a>
                    <span class="comment-time">{{ list.dateCreated }}</span>
                </div>
                <div class="comment-content-body">
                    <div ref="text" class="text" :class="{expanded: list.expanded}"><span v-if="list.isBest" class="best">BEST</span>{{ list.deleted ? $t('comment.deleted') : message }}</div>
                    <div class="toggle" v-if="list.expand">
                        <a @click="toggleExpandComment(list.id)" href="#">{{ list.expanded ? $t('comment.showless') : $t('comment.readmore') }}</a>
                    </div>
                </div>
                <div class="comment-content-footer">
                    <a href="#" @click="like" class="comment-like" :class="{ active: list.opinion === 'LIKE' }">{{ list.likeCount | number }}</a>
                    <a href="#" @click="dislike" class="comment-dislike" :class="{ active: list.opinion === 'DISLIKE' }">{{ list.dislikeCount | number }}</a>
                </div>
                <div class="right-actions">
                    <template v-if="!list.creator">
                        <a href="#" @click="popup" v-if="!list.deleted">{{ $t('comment.report') }}</a>
                    </template>
                    <template v-else>
                        <template v-if="!list.deleted">
                        <a href="#" @click="editComment({ id: list.id })">{{ $t('comment.edit') }}</a>
                        <a href="#" @click="clickDelete()">{{ $t('comment.delete') }}</a>
                        </template>
                    </template>
                </div>
                <div class="right-actions">
                </div>
            </div>
        </div>
    </li>
</template>
<script lang="babel">

	import Vue from 'vue'
	import { mapGetters, mapActions } from 'vuex'
	import * as commentTypes from '../../../store/comment-types'
	import * as popupTypes from '../../../store/popup-types'
	import StringUtil from '../../../utils/String'

    export default {
    	props: {
			list: {
				type: Object
			}
        },
        methods: {
            ...mapActions('comment',[
            	'editComment',
                'deleteComment',
                'expandComment',
                'toggleExpandComment',
                'likeComment'
            ]),
			...mapActions('popup', [
				'openCommentReport'
			]),
			clickDelete(){
				if( confirm(this.$t('comment.delete_btn')) ){
					this.deleteComment({ id: this.list.id, status: commentTypes.USER_DELETE });
				}
            },
            popup(){
				this.openCommentReport({
					commentId: this.list.id,
					commentType: 'COMMENT'
				});
            },
            like(){
				this.likeComment({
					id: this.list.id,
                    currentOpinionType: this.list.opinion,
                    likeType: this.list.opinion === commentTypes.LIKE ? commentTypes.INDIFFERENT : commentTypes.LIKE,
                    commentType: commentTypes.COMMENT
				});
            },
            dislike(){
				this.likeComment({
					id: this.list.id,
					currentOpinionType: this.list.opinion,
					likeType: this.list.opinion === commentTypes.DISLIKE ? commentTypes.INDIFFERENT : commentTypes.DISLIKE,
					commentType: commentTypes.COMMENT
				});
            }
        },
        data() {

            return {
				commentTypes,
                expanded: false,
				userLink: `/channel/user?userId=${this.list.userId}`,
				message: StringUtil.decodeHtml(this.list.comment)
            }
        },
        mounted(){
    		// +5px ie
    		if(this.$refs['text'].scrollHeight > this.$refs['text'].clientHeight + 5){
				this.expandComment({id: this.list.id, expand: true});
            }
        }
    }
</script>
<style lang="scss">
    @import '~sass/variables';

    .comment-list {
        &:hover {
            background-color: $color-gray7;
            .right-actions {
                display: block;
            }
        }

        .inner {
            padding: 20px 32px;
        }

        .comment-content {
            overflow: hidden;
            position: relative;
        }
        .comment-content-header {
            margin-bottom: 8px;
            .comment-author {
                font-size: 13px;
                color: $color-title;
                font-weight: 500;
                margin-right: 8px;
                &.creator {
                    border-radius: 5px;
                    color: white;
                    background-color: $color-title;
                    padding: 0 8px 2px 8px;
                }
            }
        }
        .comment-content-body {
            margin-bottom: 8px;

            .best {
                color: white;
                background-color: $color-red2;
                font-size: 11px;
                margin-right: 5px;
                border-radius: 5px;
                padding: 0 5px 1px 5px;
            }
            .text {
                white-space: pre-wrap;
                word-wrap: break-word;
                font-size: 13px;
                color: $color-title;
                max-height: 95px;
                overflow: hidden;
                &.expanded {
                    max-height: none;
                }
            }
            .toggle {
                a {
                    font-size: 11px;
                    color: $color-blue;
                }
            }
        }


        .comment-like, .comment-dislike {
            font-size: 11px;
            vertical-align: top;
            &:before {
                vertical-align: top;
                content: '';
                width: 16px;
                height: 13px;
                display: inline-block;
                margin-right: 5px;
                margin-top: 2px;
            }
        }

        .comment-like {
            &:before {
                background: url(../images/view/comment/btn_comment.png) no-repeat;
                .svg & {
                    background: url(../images/view/comment/btn_comment@2x.png) no-repeat;
                    background-size: 32px 26px;
                }
            }
            &.active {
                &:before {
                    background-position: 0 -13px;
                }
            }
            margin-right: 12px;
        }

        .comment-dislike {
            &:before {
                background: url(../images/view/comment/btn_comment.png) no-repeat -16px 0;
                .svg & {
                    background: url(../images/view/comment/btn_comment@2x.png) no-repeat -16px 0;
                    background-size: 32px 26px;
                }
            }
            &.active {
                &:before {
                    background-position: -16px -13px;
                }
            }
        }

        .right-actions {
            display: none;
            float: right;
            position: absolute;
            right: 0;
            top: 0;
            a {
                margin-left: 10px;
            }
        }

    }
</style>