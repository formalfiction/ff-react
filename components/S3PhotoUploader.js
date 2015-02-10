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

var S3PhotoUploader = React.createClass({displayName: "S3PhotoUploader",
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
	render : function () {
		var del 
		if (this.state.photoUrl) {
			del = React.createElement("a", {className: "delete ss-icon", onClick: this.removePhoto, onTouchEnd: this.removePhoto}, "delete")
		}
		return (
			React.createElement("div", {className: "s3PhotoUpload"}, 
				React.createElement("input", {ref: "file", style: { display : "none"}, disabled: this.state.disableUpload, ref: "file", onChange: this.s3Upload, type: "file"}), 
				React.createElement("div", {className: "photo", onClick: this.onClickPhoto, onTouchEnd: this.onClickPhoto}, 
					del, 
					React.createElement("img", {className: "preview", src: this.props.src}), 
					React.createElement("div", {className: "progress"}, 
						React.createElement("div", {className: "bar", style:  { width : this.progress()} })
					)
				), 
				React.createElement("p", {className: "status"}, this.state.uploadStatus)
			)
		);
	}
});

module.exports = S3PhotoUploader;