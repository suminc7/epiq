import _ from 'underscore'
import React, { Component, PropTypes } from 'react';
import { sortable } from 'react-sortable';
import { connect } from 'react-redux';
import { formatUtc } from '../../utils/DateUtils'

class ListItem extends Component {

	constructor(props){
		super(props);
		this.displayName = 'SortableListItem';
	}

	render(){

		const {
			id,
			language,
			data: {
				bannerName,
				bannerTitle,
				dateStart,
				dateEnd,
				bannerActivation,
				isDefault
			},
			isActivateItem,
			...propsItem
		} = this.props;

		const dateStartValue = formatUtc(dateStart);
		const dateEndValue = formatUtc(dateEnd);

		const className = `list-item${ this.props.type !== 'default' && isActivateItem ? ' info' : '' }`;



		return (

			<tr {...propsItem} className={className}>
				<td>{ (id+1) }</td>
				<td>{ bannerName }<br/><small className="c-gray">{ bannerTitle }</small></td>
				<td>{ dateStartValue }<br/>{ dateEndValue }</td>
				<td>{ language }</td>
				<td>{ bannerActivation === 'Y' ? <i className="zmdi zmdi-check zmdi-hc-fw c-blue"></i> : <i className="zmdi zmdi-close zmdi-hc-fw c-red"></i> }</td>
				<td>{ isDefault === 'N' && <i className="zmdi zmdi-menu zmdi-hc-fw"></i> }</td>
			</tr>

		)
	}
}

const SortableListItem = sortable(ListItem);

class BannerSortableList extends Component {

	constructor(props){
		super(props);

		this.state = {
			draggingIndex: null,
			items: this.props.data
		};
		this.updateState = this.updateState.bind(this);
	}


	updateState(obj) {
		this.setState(obj);
		this.props.changeItem(obj);
	}

	render(){

		const {
			data,
			type,
			languageItem
		} = this.props;

		let activeCount = 0;

		let listItems = _.map(data, (item, i) => {
			let isActivateItem = false;
			if(activeCount < 5 && item.bannerActivation === 'Y'){
				isActivateItem = true;
				activeCount++
			}
			const childProps = {
				id: i,
				data: item,
				type,
				isActivateItem,
				language: languageItem[item.languageId]
			};

			return (
				<SortableListItem
					key={i}
					updateState={this.updateState}
					items={data}
					draggingIndex={this.state.draggingIndex}
					sortId={i}
					outline="list"
					childProps={childProps}
				>
				</SortableListItem>
			)

		});


		listItems = listItems.length > 0 ? listItems :
			<tr>
				<td>-</td>
				<td>목록이 없습니다.</td>
				<td>-</td>
				<td>-</td>
				<td>-</td>
				<td>-</td>
			</tr>;


		return (
			<div className="table-responsive ">
				<table className="table table-hover sorting-table table-vmiddle ">
					<thead>
					<tr>
						<th className="id">순서</th>
						<th className="title">배너명</th>
						<th className="date">게시 기간</th>
						<th className="lang">지원 언어</th>
						<th className="enabled">활성화 여부</th>
						<th className="menu"> </th>
					</tr>
					</thead>
					<tbody>
					{listItems}
					</tbody>
				</table>
			</div>
		)
	}
}

BannerSortableList.defaultProps = {
	data: [],
	changeItem: () => {}
};

BannerSortableList.propTypes = {
	data: PropTypes.array.isRequired,
	changeItem: PropTypes.func.isRequired,
	type: PropTypes.string
};


function mapStateToProps(state){
	return {
		languageItem: state.common.languageItem
	};
}


export default connect(mapStateToProps, null)(BannerSortableList);
