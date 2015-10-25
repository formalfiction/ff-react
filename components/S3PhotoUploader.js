import React, { Component, PropTypes } from 'react';
const S3Upload = require('../libs/S3Upload')

/*
 * @stateful
 *
 * This component encapsulates the UI for client-side uploads
 * to Amazon S3. It requires a signing-server 
 * (usually the backing server for the app)
 * Actual S3 Upload logic is handled by the S3Upload lib.
 * 
 */


class S3PhotoUploader extends Component {
	static propTypes = {
		name : PropTypes.string.isRequired,
		onProgress : PropTypes.func,
		onValueChange : PropTypes.func.isRequired,
		uploadDirectory : PropTypes.string,
		src : PropTypes.string
	}

	static DefaultProps = {
		signingUrl : "/signS3"
	}

	state = {
		uploadError : undefined,
		uploadProgress : undefined,
		photoUrl : this.props.src,
		disableUpload : false,
		showCancel : true
	}

	// Methods
	pickFile = () => {
		React.findDOMNode(this.refs['file']).click()
	}

	// Event Handlers
	s3Upload = (e) => {
		var el = React.findDOMNode(this.refs['file']);

		this._uploader = new S3Upload(el,{
			s3_sign_put_url: this.props.signingUrl,
			onProgress: this.uploadProgress,
			onFinishS3Put: this.finishS3Put,
			onError: this.uploadError,
			s3ObjectName : this.props.uploadDirectory + new Date().valueOf() + ".jpg"
		});

		this.setState({
			disableUpload : true
		});
	}

	uploadProgress = (percent, message) => {
		this.setState({ uploadProgress : percent + "% Complete" });
	}
	finishS3Put = (publicURL) => {
		this.setState({
			uploadProgress : "",
			uploadError : "",
			photoUrl : publicURL
		});
		this.change();
	}
	uploadError = (status) => {
		this.setState({
			uploadError : status,
			disableUpload : false
		});
	}
	removePhoto = (e) => {
		e.preventDefault();
		this.setState({
			uploadProgress : "",
			uploadError : "",
			photoUrl : undefined
		});
		this.change();
	}
	change = () => {
		if (typeof this.props.onValueChange === "function") {
			this.props.onValueChange(this.state.photoUrl, this.props.name);
		}
	}
	onClickPhoto = (e) => {
		React.findDOMNode(this.refs["file"]).click();
	}

	// Render
	progress = () => {
		return this.state.uploadProgress ? (this.state.uploadProgress * 100) + "%" : 0;
	}
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
}

export default S3PhotoUploader;