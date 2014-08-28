/*
 * This component encapsulates the UI for client-side uploads
 * to Amazon S3. It requires a signing-server 
 * (usually the backing server for the app)
 * Actual S3 Upload logic is handled by the S3Upload lib.
 * 
 * @jsx React.DOM
 */

var S3Upload = require('../../libs/S3Upload');

var S3PhotoUploader = React.createClass({
	getInitialState : function () {
		return {
			uploadError : undefined,
			uploadProgress : undefined,
			photoUrl : this.props.src,
			disableUpload : false,
			showCancel : true
		}
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
	uploadProgress : function (percent, message) {
		this.setState({ uploadProgress : percent + "% Complete" });
	},
	finishS3Put : function (publicURL) {
		if (typeof this.props.onChange === "function") {
			this.props.onChange(publicURL);
		}

		this.setState({
			uploadProgress : "",
			uploadError : "",
			photoUrl : publicURL
		});
	},
	uploadError : function (status) {
		this.setState({
			uploadError : status,
			disableUpload : false
		});
	},
	render : function () {
		return (
			<div className="photoUpload">
				<input disabled={this.state.disableUpload} ref="file" onChange={this.s3Upload} type="file" />
				<img className="photoPreview" src={this.state.photoUrl} />
				<p>{this.state.uploadProgress}</p>
				<p>{this.state.uploadStatus}</p>
			</div>
		);
	}
});

module.exports = S3PhotoUploader;