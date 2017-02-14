import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from "react-router";
import { connect } from 'react-redux';
import { fetchBannerList, deleteBanner } from '../../actions/bannerActions';
import { PAGE_SIZE, PAGE_BTN_RANGE } from '../../constants/pages';
import Pagination from 'react-js-pagination';
import SweetAlert from 'react-bootstrap-sweetalert'
import { formatUtc, getMillisecond, getUtcOffset, formatUtcFromServer } from '../../utils/DateUtils'

class BannerWeb extends Component {

	constructor(props) {
		super(props);

		this.state = {
			activePage: 1,
			activeBannerArea: 'HOME',
			show: false
		};

		this.handleDeleteItem = this.handleDeleteItem.bind(this);
		this.getAlert = this.getAlert.bind(this);
		this.loadList = this.loadList.bind(this);

	}

	componentWillMount() {
		this.loadList();
	}

	loadList(activePage = this.state.activePage, activeBannerArea = this.state.activeBannerArea){
		this.setState({activePage, activeBannerArea});
		this.props.fetchBannerList(activePage, activeBannerArea);
	}

	handleDeleteItem(id, bannerName){
		this.setState({ alert: this.getAlert(id, bannerName) })
	}

	getAlert(id, bannerName){
		return (
			<SweetAlert
				warning
				showCancel
				confirmBtnText="삭제하기"
				cancelBtnText="취소"
				confirmBtnBsStyle="danger"
				cancelBtnBsStyle="default"
				title="삭제하시겠습니까?"
				onConfirm={ () => this.deleteFile(id) }
				onCancel={ () => this.cancelDelete(id) }
			>
				배너명: {bannerName}
			</SweetAlert>
		)
	}

	deleteFile(id){
		this.setState({ alert: null })
		this.props.deleteBanner(id)
		.then(() => {
			this.loadList();
		});
	}
	cancelDelete(){
		this.setState({ alert: null })
	}


	listsCommand(list){
		const {
			isDefault,
			id,
			bannerName
		} = list;

		if(isDefault === "Y"){
			return (
				<td className="commands">-</td>
			)
		}

		return (
			<td className="commands">
				<div>
					<Link to={`/banner/modify/${id}?default=${isDefault}`} className="btn btn-default bg waves-effect">
						<i className="zmdi zmdi-edit"></i>
					</Link>
					<button onClick={() => this.handleDeleteItem(id, bannerName)} className="btn btn-default bg waves-effect">
						<i className="zmdi zmdi-delete"></i>
					</button>
				</div>
			</td>

		)
	}

	renderList(type){

		const {
//			bannerAreaItem,
			languageItem
		} = this.props;

		const lists = type === 'default' ? this.props.list.defaultBannerInfoResDtoList : this.props.list.bannerInfoResDtoList;

		return _.map(lists, (list, index) => {

			const dateStart = formatUtc(list.dateStart);
			const dateEnd = formatUtc(list.dateEnd);
			const today = getMillisecond();
			const dateCreated = formatUtcFromServer(list.dateUpdated);
			const isDisabled = parseInt(today) > getUtcOffset(list.dateEnd) && type !== 'default';
//			const bannerArea = _.map(list.bannerArea, (item, index) => '/' + bannerAreaItem[item.bannerArea]).join('').substring(1);




			return (
				<tr key={ index } className={isDisabled && 'disabled'}>
					<td>{ list.bannerName }<br/><small className={!isDisabled && 'c-gray'}>{ list.bannerTitle }</small></td>
					<td>{ languageItem[list.languageId] }</td>
					<td>{ list.bannerActivation === 'Y' ? <i className="zmdi zmdi-check zmdi-hc-fw c-blue"></i> : <i className="zmdi zmdi-close zmdi-hc-fw c-red"></i> }</td>
					<td>{ dateStart }<br/>{ dateEnd }</td>
					{/*<td>{ bannerArea }</td>*/}
					<td>{ dateCreated }</td>
					<td>{ list.email.split('@')[0] }</td>
					{ this.listsCommand(list) }
				</tr>
			)
		});
	}


	renderPagenation(){
		return (
			<Pagination
				activePage={this.state.activePage}
				totalItemsCount={ parseInt(this.props.list.totalCnt) }
				itemsCountPerPage={PAGE_SIZE}
				pageRangeDisplayed={PAGE_BTN_RANGE}
				onChange={this.loadList}
			/>
		)
	}

	render() {

		return (
			<section id="content" className="banner-web">
				<div className="container">
					<div className="card">
						<div className="card-header">
							<h2>웹 배너
								<small>
									- 웹 배너 리스트 입니다.<br/>
									- 컴퓨터 시간이 변경되면 오류가 발생할 수 있습니다.
								</small>
							</h2>
							<div className="right-btns">
								<Link to="/banner/new" className="btn palette-Blue bg waves-effect">배너 등록</Link>
							</div>
						</div>

						<div role="tabpanel">
							<ul className="tab-nav" role="tablist">
								<li className="active"><a href="#home11" onClick={ () => this.loadList(undefined, 'HOME') } aria-controls="home11" role="tab" data-toggle="tab">홈</a></li>
								<li><a href="#profile11" onClick={ () => this.loadList(undefined, 'CHANNEL') } aria-controls="profile11" role="tab" data-toggle="tab">채널</a></li>
								<li><a href="#messages11" onClick={ () => this.loadList(undefined, 'PREMIUM') } aria-controls="messages11" role="tab" data-toggle="tab">프리미엄</a></li>
								<li><a href="#settings11" onClick={ () => this.loadList(undefined, 'VRSTAR') } aria-controls="settings11" role="tab" data-toggle="tab">VR 스타</a></li>
							</ul>
						</div>
						<div className="card-body">
							<div className="tab-content">
								<table id="data-table-command" className="list-table table table-vmiddle">
									<thead>
									<tr>
										<th className="title">배너명</th>
										<th className="language">언어</th>
										<th className="activation">활성</th>
										<th className="date">게시일 및 시간</th>
										{/*<th className="area">영역</th>*/}
										<th className="dateUpdated">수정일</th>
										<th className="updatedID">수정 ID</th>
										<th className="commands">기능</th>
									</tr>
									</thead>
									<tbody>
									{this.renderList()}
									</tbody>
								</table>
							</div>

							<div id="data-table-selection-footer" className="bootgrid-footer container-fluid">
								<div className="row">
									<div className="col-sm-6">
										{this.renderPagenation()}
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="card">
						<div className="card-header">
							<h2>기본 배너 <small>- 기본 배너 리스트는 삭제되지 않습니다.</small></h2>
						</div>
						<div className="card-body">
							<table id="data-table-command" className="list-table table table-vmiddle">
								<thead>
								<tr>
									<th className="title">배너명</th>
									<th className="language">언어</th>
									<th className="activation">활성</th>
									<th className="date">게시일 및 시간</th>
									{/*<th className="area">영역</th>*/}
									<th className="dateUpdated">수정일</th>
									<th className="updatedID">수정 ID</th>
									<th className="commands">기능</th>
								</tr>
								</thead>
								<tbody>
								{this.renderList('default')}
								</tbody>
							</table>
							<div id="data-table-selection-footer" className="bootgrid-footer container-fluid">
								<div className="row">
									<div className="col-sm-6">
										{this.renderPagenation()}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{this.state.alert}
			</section>
		);
	}
}

function mapStateToProps(state){
	return {
		list: state.banner.list,
		bannerAreaItem: state.common.bannerAreaItem,
		languageItem: state.common.languageItem
	};
}

export default connect(mapStateToProps, { fetchBannerList, deleteBanner })(BannerWeb);

