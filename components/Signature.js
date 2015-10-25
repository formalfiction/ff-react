import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import Device from '../utils/Device';
import SignaturePad from '../libs/SignaturePad';
import TouchButton from './TouchButton';

/*
 * SignaturePad takes user signatures & spits out
 * Data-URI's of that information.
 * 
 */

class Signature extends Component {
	static propTypes = {
		// optional dataURI to populate signature with
		data : PropTypes.string,
		// width of the canvas.
		width : PropTypes.number.isRequired,
		// flag for if the canvas has been signed
		// (contains any drawing)
		signed : PropTypes.bool,
		// completion handler func
		done : PropTypes.func.isRequired,
		// heightRatio defaults to 0.5, yeilding an aspect ratio of 2:1
		heightRatio : PropTypes.number,
	}
	static defaultProps = {
		signed : false,
		heightRatio : 2.5
	}

	// lifecycle
	componentDidMount = () => {
		Device.onOrientationChange(this.onResizeEnd);
		Device.onResizeEnd(this.onResizeEnd);
		var canvas = findDOMNode(this.refs.canvas)
			, ratio = window.devicePixelRatio || 1

		// canvas.height = Math.floor(w/this.props.heightRatio)
		this.signaturePad = new SignaturePad(findDOMNode(this.refs.canvas));

		if (this.props.data) {
			this.signaturePad.fromDataURL(this.props.data);
		}
		if (this.props.signed) {
			this.signaturePad.enabled(false);
		}
		
		this.onResizeEnd();
	}
	componentWillUnmount = () => {
		Device.offResizeEnd(this.onResizeEnd);
		Device.offOrientationChange(this.onResizeEnd);
	}
	componentDidUpdate = () => {
		if (this.props.signed) {
			this.signaturePad.enabled(false);
		}
	}
	// Methods
	onResizeEnd = () => {
		var canvas = findDOMNode(this.refs.canvas)
			, ratio = window.devicePixelRatio || 1
			, signatureCopy;

		if (!this.signaturePad.isEmpty()) {
		    signatureCopy = this.signaturePad.toDataURL();
		}

		// Note fixed width:height ratio. No need for dynamic height.       
		canvas.width = canvas.offsetWidth * ratio;
		canvas.height = Math.floor(canvas.offsetWidth/this.props.heightRatio) * ratio; 
		canvas.getContext("2d").scale(ratio, ratio);

		// var scaleChange = (canvas.offsetWidth * ratio) / this.canvasWidth;
		// console.log(scaleChange);

		// Line width is relative to canvas size to prevent different
		// width after orientation changes.
		this.signaturePad.minWidth = canvas.offsetWidth / 1000;
		this.signaturePad.maxWidth = this.signaturePad.minWidth * 5;

		if (!this.signaturePad.isEmpty()) {
	    this.signaturePad.fromDataURL(signatureCopy);
		} else {
	    // signaturePad doesn't watch canvas and needs to be told it's clear now
	    this.signaturePad.clear(); 
		}

		// this.canvasWidth = canvas.width
  }

	onReset = (e) => {
		e.preventDefault();
		this.signaturePad.clear();
		this.signaturePad.disabled = false;
		return false;
	}
	onDone = (e) => {
		e.preventDefault();

		if (this.signaturePad.isEmpty()) {
			alert('please sign first!');
			return;
		}

		if (typeof this.props.done === "function") {
			this.props.done(this.signaturePad.toDataURL());
		}
		this.signaturePad.disabled = true;
		return false;
	}
	render() {
		return (
			<div className="signature">
				<canvas ref="canvas" style={{ width : this.props.width }} className="canvas"></canvas>
				<div className="buttons">
			 		<TouchButton className="reset" disabled={this.props.signed} onClick={this.onReset} text="reset" />
					<TouchButton className="done" disabled={this.props.signed} onClick={this.onDone} text="done" />
				</div>
			</div>
		);
	}
}

export default Signature;