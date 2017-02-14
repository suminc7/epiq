import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { PAGE_SIZE, PAGE_BTN_RANGE } from '../../constants/pages';
import Pagination from 'react-js-pagination';
import { formatUtcFromServer } from '../../utils/DateUtils'

class ListTable extends Component {

	constructor(props){
		super(props);

		this.handlePageChange = this.handlePageChange.bind(this);

	}

	handlePageChange(pageNumber) {
		this.props.handlePageChange(pageNumber);
	}


	renderList(){

		const lists = this.props.lists;

		return _.map(lists, (list, index) => {

			const dateCreated = formatUtcFromServer(list.dateUpdated);

			return (
				<tr key={list.id}>
					<td>{list.id}</td>
					<td>{list.title}</td>
					<td>{list.nickname}</td>
					<td>{dateCreated}</td>
					{ this.props.listsCommand(list) }
				</tr>
			)
		});
	}

	renderPagenation(){
		return (
			<Pagination
				activePage={this.props.activePage}
				totalItemsCount={ parseInt(this.props.totalCount) }
				itemsCountPerPage={PAGE_SIZE}
				pageRangeDisplayed={PAGE_BTN_RANGE}
				onChange={this.handlePageChange}
			/>
		)
	}


	render(){


		return (
			<div>
				<table id="data-table-command" className="list-table table table-striped table-vmiddle">
					<thead>
					<tr>
						<th className="id" data-type="numeric">ID</th>
						<th className="title">Title</th>
						<th className="sender">Nickname</th>
						<th className="received" data-order="desc">Received</th>
						<th className="commands" data-order="desc">Commands</th>
					</tr>
					</thead>
					<tbody>
					{this.renderList()}
					</tbody>
				</table>
				<div id="data-table-selection-footer" className="bootgrid-footer container-fluid">
					<div className="row">
						<div className="col-sm-6">
							{this.renderPagenation()}
						</div>
						<div className="col-sm-6">
							{this.props.bottomCommand()}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

ListTable.defaultProps = {
	lists: [],
	activePage: 0,
	totalCount: 0,
	listsCommand: () => {},
	bottomCommand: () => {},
	handlePageChange: () => {}
};


ListTable.propTypes = {
	lists: PropTypes.array.isRequired,
	totalCount: PropTypes.number.isRequired,
	listsCommand: PropTypes.func.isRequired,
	bottomCommand: PropTypes.func,
	handlePageChange: PropTypes.func.isRequired
};

export default ListTable;