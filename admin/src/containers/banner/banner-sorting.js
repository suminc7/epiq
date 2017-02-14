import _ from 'underscore'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'jasny-bootstrap/js/fileinput';
import BannerSortableList from "../../components/banner/BannerSortableList";
import { fetchOrderList, saveOrderList } from '../../actions/bannerActions';



class BannerSorting extends Component {

	constructor(props) {
		super(props);


		this.state = {
			languageId: 'ko',
			bannerArea: 'HOME',
			draggingIndex: null,
			dragItems: []
		};

		this.handleLanguage = this.handleLanguage.bind(this);
		this.handleChangeItem = this.handleChangeItem.bind(this);
		this.handleSaveItem = this.handleSaveItem.bind(this);

	}

	componentWillMount(){
		this.loadList(this.state.languageId, this.state.bannerArea);
	}

	resetItems(){
		this.setState({dragItems: []});
	}

	loadList(languageId, bannerArea){
		this.props.fetchOrderList(languageId, bannerArea)
		.then(() => {
			this.resetItems();
		});
	}

	handleTabpanel(bannerArea){
		this.setState({bannerArea});
		this.loadList(this.state.languageId, bannerArea);
	}

	handleChangeItem(data){
		this.setState({
			draggingIndex: data.draggingIndex || this.state.draggingIndex,
			dragItems: data.items || this.state.dragItems
		});
	}

	handleSaveItem(){

		const {
			languageId,
			bannerArea,
			dragItems
		} = this.state;

		const ids = _.map(dragItems, (item, idx) => item.id);


		this.props.saveOrderList({bannerArea, languageId, ids})
		.then(() => {
			this.resetItems();
		});
	}

	handleLanguage(languageId){
		this.setState({languageId: languageId});
		this.loadList(languageId, this.state.bannerArea);
	}

	render() {

		const {
			orderlist: {defaultBannerList, adminBannerList},
			languageItem
		} = this.props;

		const {
			dragItems
		} = this.state;


		return (


			<section id="content" className="banner-sorting">
				<div className="container">

					<div className="card">
						<div className="card-header">
							<h2>배너 순서 관리
								<small>
									- 파란색으로 표시된 배너들만 순서대로 실제 웹에 노출됩니다.<br/>
									- 각 탭마다 순서 변경 후 저장하기 버튼을 클릭해야 변경한 순서가 저장됩니다.<br/>
									- 컴퓨터 시간이 변경되면 오류가 발생할 수 있습니다.
								</small>
							</h2>
							<div className="right-btns">
								<div className="btn-group">
									<button type="button" className="btn btn-default">{ languageItem[this.state.languageId] }</button>
									<button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
										<span className="caret"></span>
										<span className="sr-only">Split button dropdowns</span>
									</button>
									<ul className="dropdown-menu" role="menu">
										{
											_.values(
												_.mapObject(this.props.languageItem, (val, key) => {
													return <li key={key}><a onClick={e => this.handleLanguage(key)}>{ val }</a></li>
												})
											)
										}
									</ul>
								</div>
								<button
									onClick={this.handleSaveItem}
									className="save-btn btn btn-primary waves-effect"
									disabled={
										dragItems.length < 2
									}
								>
									저장하기
								</button>
							</div>
						</div>
						<div className="card-body">
							<div role="tabpanel">
								<ul className="tab-nav" role="tablist">
									<li className="active"><a href="#home11" onClick={()=>this.handleTabpanel('HOME')} aria-controls="home11" role="tab" data-toggle="tab">홈</a></li>
									<li><a href="#profile11" onClick={()=>this.handleTabpanel('CHANNEL')} aria-controls="profile11" role="tab" data-toggle="tab">채널</a></li>
									<li><a href="#messages11" onClick={()=>this.handleTabpanel('PREMIUM')} aria-controls="messages11" role="tab" data-toggle="tab">프리미엄</a></li>
									<li><a href="#settings11" onClick={()=>this.handleTabpanel('VRSTAR')} aria-controls="settings11" role="tab" data-toggle="tab">VR 스타</a></li>
								</ul>
								<div className="tab-content">
									<BannerSortableList data={adminBannerList} changeItem={this.handleChangeItem} />
								</div>
							</div>
						</div>
					</div>

					<div className="card">
						<div className="card-header">
							<h2>기본 배너 <small>- 기본 배너는 순서관리가 지원되지 않습니다.</small></h2>
						</div>
						<div className="card-body">
							<BannerSortableList data={defaultBannerList} type="default" />
						</div>
					</div>
				</div>
			</section>
		);
	}
}


function mapStateToProps(state){
	return {
		orderlist: state.banner.orderlist,
		languageItem: state.common.languageItem
	};
}


export default connect(mapStateToProps, { fetchOrderList, saveOrderList })(BannerSorting);