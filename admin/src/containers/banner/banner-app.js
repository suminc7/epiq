import React, { Component } from 'react';
import { Link } from "react-router";
import { connect } from 'react-redux';
import { fetchContentList } from '../../actions/index';
import ListTable from '../../components/lists/ListTable';

class BannerApp extends Component {

	constructor(props) {
		super(props);

		this.state = {
			activePage: 1
		};
	}

	componentWillMount() {
		this.handlePageChange(this.state.activePage);
	}

	handlePageChange(pageNumber) {
		this.setState({activePage: pageNumber});
		this.props.fetchContentList('total', pageNumber);
	}

	listsCommand(list){
		return (
			<td>
				<Link to={`/banner/modify/${list.id}`} className="btn btn-default bg waves-effect">
					<i className="zmdi zmdi-edit"></i>
				</Link>
			</td>
		)
	}


	render() {

		return (
			<section id="content" className="banner-app">
				<div className="container">
					<div className="card">
						<div className="card-header">
							<h2>웹 배너 <small>웹 배너 리스트 입니다.</small></h2>
						</div>

						<ListTable
							lists={this.props.data.contentResDtoList}
							activePage={this.state.activePage}
							totalCount={this.props.data.totalCnt}
							listsCommand={this.listsCommand}
							handlePageChange={this.handlePageChange.bind(this)}
						/>
					</div>
				</div>
			</section>
		);
	}
}

function mapStateToProps(state){
	return {
		data: state.list.data
	};
}

export default connect(mapStateToProps, { fetchContentList })(BannerApp);

