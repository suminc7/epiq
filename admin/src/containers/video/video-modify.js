import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchContentsList } from '../../actions/index';

class VideoModify extends Component {

	componentDidMount(){

		this.props.fetchContentsList(this.props.params.id);


	}

	render() {


		const {
			channel,
			userProfileDtoList
		} = this.props.content;


		const profileImageList = _.map(userProfileDtoList, (list) => {
			return list.profilePath;
		});

		const divStyle = {
			backgroundImage: `url(${ profileImageList.length > 0 ? profileImageList[0] : '' })`,
			backgroundSize: `cover`,
		};


		return (
			<section id="content" className="video-premium">
				<div className="container">
					<div className="row">
						<div className="col-md-8">
							<div id="profile-main" className="card">
								<div className="card-header">
									<h2>컨텐츠 수정하기 <small>컨텐츠를 수정할 수 있습니다.</small></h2>
								</div>

								<div className="card-header">
									<div className="media">
										<div className="pull-left">
											<div className="avatar-img a-lg" style={divStyle}></div>
										</div>
										<div className="media-body m-t-5">
											<h2>{channel} <small>Posted on 31st Aug 2015 at 07:00</small></h2>
										</div>
									</div>
								</div>

								<div className="pmb-block">
									<div className="pmbb-header">
										<h2><i className="zmdi zmdi-account m-r-5"></i> Basic Information</h2>
									</div>
									<div className="pmbb-body p-l-30">
										<div className="pmbb-view">
											<dl className="dl-horizontal">
												<dt>Full Name</dt>
												<dd>Mallinda Hollaway</dd>
											</dl>
											<dl className="dl-horizontal">
												<dt>Gender</dt>
												<dd>Female</dd>
											</dl>
											<dl className="dl-horizontal">
												<dt>Birthday</dt>
												<dd>June 23, 1990</dd>
											</dl>
											<dl className="dl-horizontal">
												<dt>Martial Status</dt>
												<dd>Single</dd>
											</dl>
										</div>
									</div>
								</div>

							</div>
						</div>
						<div className="col-md-4"></div>
					</div>
				</div>
			</section>
		);
	}
}

function mapStateToProps(state){
	return {
		content: state.content.data
	};
}


export default connect(mapStateToProps, { fetchContentsList })(VideoModify);