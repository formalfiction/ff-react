/** @jsx React.DOM */

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

var S3PhotoUploader = React.createClass({
	propTypes : {
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
	removePhoto : function () {
		this.setState({
			uploadProgress : "",
			uploadError : "",
			photoUrl : undefined
		});
		this.change();
	},
	change : function () {
		if (typeof this.props.onChange === "function") {
			this.props.onChange(this.state.photoUrl);
		}
	},

	// Render
	render : function () {
		var del 
		if (this.state.photoUrl) {
			del = <a className="ss-icon" onClick={this.removePhoto} onTouchEnd={this.removePhoto}>delete</a>
		}
		return (
			<div className="photoUpload">
				<input disabled={this.state.disableUpload} ref="file" onChange={this.s3Upload} type="file" />
				<img className="photoPreview" src={this.props.src} />
				<p>{this.state.uploadProgress}</p>
				<p>{this.state.uploadStatus}</p>
				{del}
			</div>
		);
	}
});

module.exports = S3PhotoUploader;