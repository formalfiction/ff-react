
import { Component, PropTypes } from 'react';

/*
 * @stateful
 *
 * This component encapsulates the UI for client-side uploads
 * to Amazon S3. It requires a signing-server 
 * (usually the backing server for the app)
 * Actual S3 Upload logic is handled by the S3Upload lib.
 * 
 */

var S3Upload = require('../deps/S3Upload');

var S3PhotoUploader extends Component {
	static propTypes = {
		// @todo
	},

	// Component lifecycle methods
	getInitialState : function () {
		return {
			uploadError : undefined,
			uploadProgress : undefined,
			photoUrl : this.props.src,
			disableUpload : false,
			showCancel : true
		}
	},

	// Methods
	pickFile : function () {
		this.refs['file'].getDOMNode().click()
	},
	s3Upload : function (e) {
		var el = this.refs['file'].getDOMNode();

		this._uploader = new S3Upload(el,{
			s3_sign_put_url: '/signS3',
			onProgress: this.uploadProgress,
			onFinishS3Put: this.finishS3Put,
			onError: this.uploadError,
			s3ObjectName : new Date().valueOf() + ".jpg"
		});

		this.setState({
			disableUpload : true
		});
	},

	// Event Handlers

	uploadProgress : function (percent, message) {
		this.setState({ uploadProgress : percent + "% Complete" });
	},
	finishS3Put : function (publicURL) {
		this.setState({
			uploadProgress : "",
			uploadError : "",
			photoUrl : publicURL
		});
		this.change();
	},
	uploadError : function (status) {
		this.setState({
			uploadError : status,
			disableUpload : false
		});
	},
	removePhoto : function (e) {
		e.preventDefault();
		this.setState({
			uploadProgress : "",
			uploadError : "",
			photoUrl : undefined
		});
		this.change();
		return false;
	},
	change : function () {
		if (typeof this.props.onChange === "function") {
			this.props.onChange(this.state.photoUrl);
		}
	},
	onClickPhoto : function (e) {
		this.refs["file"].getDOMNode().click();
	},

	// Render
	progress : function () {
		return this.state.uploadProgress ? (this.state.uploadProgress * 100) + "%" : 0;
	},
	render() {
		var del 
		if (this.state.photoUrl) {
			del = <a className="delete ss-icon" onClick={this.removePhoto} onTouchEnd={this.removePhoto}>delete</a>
		}
		return (
			<div className="s3PhotoUpload">
				<input ref="file" style={{ display : "none"}} disabled={this.state.disableUpload} ref="file" onChange={this.s3Upload} type="file" />
				<div className="photo" onClick={this.onClickPhoto} onTouchEnd={this.onClickPhoto}>
					{del}
					<img className="preview" src={this.props.src} />
					<div className="progress">
						<div className="bar" style={ { width : this.progress() } }></div>
					</div>
				</div>
				<p className="status">{this.state.uploadStatus}</p>
			</div>
		);
	}
});

export default S3PhotoUploader;