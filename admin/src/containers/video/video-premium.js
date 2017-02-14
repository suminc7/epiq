import React, { Component } from 'react';
import ListTable from '../../components/lists/ListTable';
import { fetchContentList, updatePremiumList } from '../../actions/index';
import { connect } from 'react-redux';

class VideoPremium extends Component {

	constructor(props) {
		super(props);

		this.state = {
			activePage: 1
		};

		this.listsCommand = this.listsCommand.bind(this);
	}

	componentWillMount() {
		this.handlePageChange(this.state.activePage);
	}

	onConfirmClick(id){
		this.props.updatePremiumList(id, 'Y').then(() => {
			this.handlePageChange(this.state.activePage);
		});
	}

	onRejectClick(id){
		this.props.updatePremiumList(id, 'C').then(() => {
			this.handlePageChange(this.state.activePage);
		});
	}

	handlePageChange(pageNumber) {
		this.setState({activePage: pageNumber});
		this.props.fetchContentList('premium', pageNumber);
	}

	listsCommand(list){

		return (
			<td>
				<button
					onClick={this.onConfirmClick.bind(this, list.id)}
					className={`btn ${list.isConfirmAdmin == 'Y' ? 'btn-primary' : 'btn-default'} bg waves-effect`}
					disabled={list.isConfirmAdmin == 'Y' ? 'disabled' : ''}>
					<i className="zmdi zmdi-check"></i>
				</button>
				<button
					onClick={this.onRejectClick.bind(this, list.id)}
					className={`btn ${list.isConfirmAdmin == 'C' ? 'btn-danger' : 'btn-default'} bg waves-effect`}
					disabled={list.isConfirmAdmin == 'C' ? 'disabled' : ''}>
					<i className="zmdi zmdi-close"></i>
				</button>
			</td>
		)
	}


	render() {
		return (
			<section id="content" className="banner-web">
				<div className="container">
					<div className="card">
						<div className="card-header">
							<h2>프리미엄 동영상 <small>프리미엄 동영상의 승인여부를 확인할 수 있습니다.</small></h2>
						</div>

						<ListTable
							lists={this.props.data.adminPremiumCheckList}
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
export default connect(mapStateToProps, { fetchContentList, updatePremiumList })(VideoPremium);