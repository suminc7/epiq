import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import DateTimeField from 'react-bootstrap-datetimepicker';
import 'jasny-bootstrap/js/fileinput';
import { newBanner, fetchBanner } from '../../actions/bannerActions';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import {RadioGroup, Radio} from 'react-radio-group';
import { hashHistory } from 'react-router';
import { getMoment } from '../../utils/DateUtils'

const InputText = ({ input, maxLength, disabled, meta: { touched, error } }) => {
	return (
		<span className={touched && error && 'has-error'}>
			<input  {...input} maxLength={maxLength} disabled={disabled} className="form-control input-sm" />
			{touched && error && <small className="help-block">{error}</small>}
			<small className="text-length">{input.value.length} / {maxLength}</small>
		</span>
	)
};

const InputFile = ({ input, meta: { active, touched, error } }) => {

	return (
		<div className={touched && error && !active && 'has-error'}>
			<span className="btn btn-info btn-file">
				<span className="fileinput-new">Select image</span>
				<span className="fileinput-exists">Change</span>
				<input  {...input} type="file" />
			</span>
			{touched && error && !active && <small className="help-block">{ error }</small>}
		</div>
	)
};



class VideoModify extends Component {

	constructor(props) {
		super(props);

		this.bannerType = 'new';

		this.onHandleSubmit = this.onHandleSubmit.bind(this);
		this.fetchedBanner = this.fetchedBanner.bind(this);
		this.loadBanner = this.loadBanner.bind(this);
	}

	componentWillMount(){
		this.loadBanner();
	}

	componentDidMount(){
		$('.fileinput').fileinput();


	}

	loadBanner(){

		if(this.props.params.id){
			this.bannerType = 'modify';
			this.props.fetchBanner(this.props.params.id, this.props.location.query.default)
				.then(data => {
					this.fetchedBanner();
				});
		}else{
			this.bannerType = 'new';
		}
	}

	fetchedBanner(){

		const {
			initialize,
			item,
		} = this.props;

		initialize(item);

	}




	onHandleSubmit(props) {

		const type = this.bannerType;

		this.props.newBanner(props, type)
		.then(data => {
			if(data.payload.data.code === 200){
				hashHistory.push('/banner/web');
			}else{
				alert('오류 입니다.');
			}
		});
	}

	render() {
		const { handleSubmit, item, pristine, submitting, linkAction } = this.props;



		return (
			<section id="content" className="banner-modify">
				<div className="container">
					<form onSubmit={handleSubmit(this.onHandleSubmit)} className="form-horizontal" role="form">


						<div className="card">
							<div className="card-header">
								<h2>기본 설정 <small></small></h2>
							</div>

							<div className="card-body card-padding">

								<div className="form-group">
									<label htmlFor="inputPopupName" className="col-sm-2 control-label">팝업이름</label>
									<div className="col-sm-10">
										<div className="fg-line">
											<Field name="bannerName" maxLength="50" type="text" component={InputText} placeholder=""/>
										</div>
									</div>
								</div>

								<div className="form-group">
									<label htmlFor="inputPopupName" className="col-sm-2 control-label">활성화 여부</label>
									<div className="col-sm-10">
										<div className="fg-line">
											<Field name="bannerActivation" component={ ({input, meta: {touched, error}}) =>
												<RadioGroup className={touched && error && 'has-error'}
																		name={input.name}
																		selectedValue={input.value}
																		onChange={input.onChange}>
													<label className="radio radio-inline m-r-20"><Radio value="Y"/><i className="input-helper"></i>Y</label>
													<label className="radio radio-inline m-r-20"><Radio value="N"/><i className="input-helper"></i>N</label>
												</RadioGroup>
											}/>
										</div>
									</div>
								</div>

								<div className="form-group">
									<label htmlFor="inputPopupName" className="col-sm-2 control-label">게시 영역</label>
									<div className="col-sm-10">
										<div className="fg-line">
											<Field name="bannerArea" component={ ({ input, meta: { touched, error } }) =>
												<CheckboxGroup className={touched && error && 'has-error'}
																			 name={input.name}
																			 value={input.value || []}
																			 onChange={input.onChange}>
													<label className="checkbox checkbox-inline m-r-20"><Checkbox value="HOME" /><i className="input-helper"></i>홈</label>
													<label className="checkbox checkbox-inline m-r-20"><Checkbox value="CHANNEL" /><i className="input-helper"></i>채널</label>
													<label className="checkbox checkbox-inline m-r-20"><Checkbox value="PREMIUM" /><i className="input-helper"></i>프리미엄</label>
													<label className="checkbox checkbox-inline m-r-20"><Checkbox value="VRSTAR" /><i className="input-helper"></i>VR스타</label>
												</CheckboxGroup>
											}/>
										</div>
									</div>
								</div>

								<div className="form-group">
									<label htmlFor="inputPopupName" className="col-sm-2 control-label">마크 선택</label>
									<div className="col-sm-10">
										<div className="fg-line">
											<Field name="bannerMarkId" component={ ({ input, meta: { touched, error } }) =>
												<RadioGroup className={touched && error && 'has-error'}
																		name={input.name}
																		selectedValue={input.value}
																		onChange={input.onChange}>
													<label className="radio radio-inline m-r-20"><Radio value="EVENT"/><i className="input-helper"></i>EVENT</label>
													<label className="radio radio-inline m-r-20"><Radio value="NEW"/><i className="input-helper"></i>NEW</label>
													<label className="radio radio-inline m-r-20"><Radio value="HOT"/><i className="input-helper"></i>HOT</label>
													<label className="radio radio-inline m-r-20"><Radio value="PREMIUM"/><i className="input-helper"></i>PREMIUM</label>
													<label className="radio radio-inline m-r-20"><Radio value="CHANNEL"/><i className="input-helper"></i>CHANNEL</label>
													<label className="radio radio-inline m-r-20"><Radio value="STAR"/><i className="input-helper"></i>STAR</label>
												</RadioGroup>
											}/>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="card">
							<div className="card-header">
								<h2>텍스트 입력
									<small>
										- 실제로 웹에 보여지는 텍스트를 입력하는 부분입니다.<br/>
										- 타이틀은 한 줄 당 공백 포함 20글자 내외가 가장 적합합니다.<br/>
										- 내용은 한 줄 당 공백포함 40글자 내외가 가장 적합합니다.
									</small>
								</h2>
							</div>

							<div className="card-body card-padding">
								<div className="form-group">
									<label htmlFor="inputPopupName" className="col-sm-2 control-label">언어 선택</label>
									<div className="col-sm-10">
										<div className="fg-line">
											<Field name="languageId" component={ ({ input, meta: { touched, error } }) =>
												<RadioGroup className={touched && error && 'has-error'}
																		name={input.name}
																		selectedValue={input.value}
																		onChange={input.onChange}>
													<label className="radio radio-inline m-r-20"><Radio value="ko"/><i className="input-helper"></i>국문</label>
													<label className="radio radio-inline m-r-20"><Radio value="en"/><i className="input-helper"></i>영문</label>
												</RadioGroup>
											}/>
										</div>
									</div>
								</div>

								<div className="form-group">
									<label htmlFor="inputPopupName" className="col-sm-2 control-label">타이틀</label>
									<div className="col-sm-10">
										<div className="fg-line">
											<Field name="bannerTitle" maxLength="50" type="text" component={InputText} placeholder=""/>
										</div>
									</div>
								</div>

								<div className="form-group">
									<label htmlFor="inputPopupName" className="col-sm-2 control-label">내용</label>
									<div className="col-sm-10">
										<div className="fg-line">
											<Field name="bannerDescFirst" maxLength="80" type="text" component={InputText} placeholder=""/>
										</div>
										<div className="fg-line">
											<Field name="bannerDescSecond" maxLength="80" type="text" component={InputText} placeholder=""/>
										</div>
										<div className="fg-line">
											<Field name="bannerDescThird" maxLength="80" type="text" component={InputText} placeholder=""/>
										</div>
									</div>
								</div>



							</div>
						</div>


						<div className="card">
							<div className="card-header">
								<h2>링크 설정 <small></small></h2>
							</div>

							<div className="card-body card-padding">
								<div className="form-group">
									<label htmlFor="inputPopupName" className="col-sm-2 control-label">링크 액션 션택</label>
									<div className="col-sm-10">
										<div className="fg-line">
											<Field name="linkAction" component={ ({ input, meta: { touched, error } }) =>
												<RadioGroup className={touched && error && 'has-error'}
																		name={input.name}
																		selectedValue={input.value}
																		onChange={input.onChange}>
													<label className="radio radio-inline m-r-20"><Radio value="NOTHING"/><i className="input-helper"></i>없음</label>
													<label className="radio radio-inline m-r-20"><Radio value="CURRENT"/><i className="input-helper"></i>현재창</label>
													<label className="radio radio-inline m-r-20"><Radio value="NEW"/><i className="input-helper"></i>새창</label>
												</RadioGroup>
											}/>

										</div>
									</div>
								</div>

								<div className="form-group">
									<label htmlFor="inputPopupName" className="col-sm-2 control-label">버튼 URL 입력</label>
									<div className="col-sm-10">
										<div className="fg-line">
											<Field name="linkUrl" maxLength="200" type="text" disabled={linkAction === 'NOTHING'} component={InputText} placeholder=""/>
										</div>
									</div>
								</div>


							</div>
						</div>

						<div className="card">
							<div className="card-header">
								<h2>게시 시간 <small></small></h2>
							</div>
							<div className="card-padding card-body">
								<div className="row">
									<Field name="dateStart" component={({ input, meta: { touched, error, pristine, submitFailed } }) =>
										<div className="col-sm-6">
											<p className="f-500 m-b-20"><span className={submitFailed && error && 'text-danger'}>시작 시간</span></p>

											<div className="input-group form-group">
												<span className="input-group-addon"><i className="zmdi zmdi-calendar"></i></span>
												<div className="dtp-container fg-line">
													<DateTimeField
														dateTime={input.value}
														onChange={date => {
															input.onChange(date);
															this.props.change('dateEnd', date);
														}}
														minDate={getMoment()}
														inputFormat={"YYYY/MM/DD HH:mm"}
													/>
												</div>
											</div>
										</div>
									}/>


									<Field name="dateEnd" ref="dateEnd" component={({ input, meta: { touched, error, pristine, submitFailed } }) =>
										<div className="col-sm-6">
											<p className="f-500 m-b-20"><span className={submitFailed && error && 'text-danger'}>종료 시간</span></p>
											<div className="input-group form-group">
												<span className="input-group-addon"><i className="zmdi zmdi-calendar"></i></span>
												<div className="dtp-container fg-line ">
													<DateTimeField
														dateTime={input.value}
														onChange={date => {
															input.onChange(date);
														}}
														minDate={getMoment()}
														inputFormat={"YYYY/MM/DD HH:mm"}
													/>
												</div>
											</div>
										</div>
									}/>
								</div>
							</div>
						</div>




						<div className="card">
							<div className="card-header">
								<h2>이미지 업로드 <small>- 이미지 기본 사이즈는 936x348 입니다.</small></h2>
							</div>

							<div className="card-body card-padding">
								<p className="f-500 c-black m-b-20">Image Preview</p>
								<div className={this.bannerType === 'modify' ? `fileinput fileinput-exists` : 'fileinput fileinput-new'} data-provides="fileinput">
									<div className="fileinput-preview thumbnail" data-trigger="fileinput">
										{ this.bannerType === 'modify' ? <img src={item.bannerImage} /> : <div></div> }
									</div>
									<Field name="bannerImage" component={InputFile} type="file" />
								</div>

								<div className="btn-center-box">
									<button className="btn btn-default waves-effect" type="button" onClick={hashHistory.goBack}>취소하기</button>
									<button className="btn btn-primary waves-effect" type="submit" disabled={pristine || submitting}>{this.bannerType === 'modify' ? '수정하기' : '등록하기'}</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</section>
		);
	}
}



const validate = values => {


	const errors = {};
	if (!values.bannerName) {
		errors.bannerName = 'Required';
	}

	if(!values.bannerActivation){
		errors.bannerActivation = 'Required';
	}

	if(!values.bannerArea || values.bannerArea.length < 1){
		errors.bannerArea = 'Required';
	}

	if(!values.bannerMarkId){
		errors.bannerMarkId = 'Required';
	}


	if (!values.languageId) {
		errors.languageId = 'Required';
	}


	if (values.bannerDescSecond){
		if (!values.bannerDescFirst) {
			errors.bannerDescFirst = 'Required';
		}
	}

	if (values.bannerDescThird){
		if (!values.bannerDescFirst) {
			errors.bannerDescFirst = 'Required';
		}
		if (!values.bannerDescSecond) {
			errors.bannerDescSecond = 'Required';
		}
	}


	if (!values.bannerTitle) {
		errors.bannerTitle = 'Required';
	}

	if(!values.linkAction){
		errors.linkAction = 'Required';
	}else if(values.linkAction !== 'NOTHING'){

		if(!values.linkUrl){
			errors.linkUrl = 'Required';
		}

	}if(values.linkAction === 'NOTHING') {
		values.linkUrl = null;
	}


	if(values.dateStart === values.dateEnd){
		errors.dateStart = 'Required';
		errors.dateEnd = 'Required';
	}else if(values.dateStart > values.dateEnd){
		errors.dateStart = 'Required';
		errors.dateEnd = 'Required';
		values.dateStart = values.dateEnd;
	}

//	values.dateEnd = values.dateStart;

	if(!values.bannerImage) {
		errors.bannerImage = '이미지를 선택해 주세요.';
	}else if(values.bannerImage.length < 1){
		errors.bannerImage = '이미지를 선택해 주세요.';
	}


//	console.log('values', values);
//	console.log('errors', errors);
//	console.log('this', this);
	{/*defaultText={pristine ? "Please select a date" : undefined }*/}

	return errors
};


VideoModify = reduxForm({
	form: 'newBanner',
	validate
})(VideoModify);


const selector = formValueSelector('newBanner');


VideoModify = connect(state => {

	const linkAction = selector(state, 'linkAction');

	return {
		item: state.banner.item,
		initialValues: state.banner.defaultItem,
		linkAction
	}

}, { newBanner, fetchBanner })(VideoModify);

export default VideoModify;