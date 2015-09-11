import { Component, PropTypes } from 'react';
import DeviceStore from '../stores/DeviceStore';
import SignaturePad from '../deps/SignaturePad';
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

	// sure, let's cheat a bunch
	canvasWidth : undefined

	// lifecycle
	componentDidMount = () => {
		DeviceStore.onOrientationChange(this.onResizeEnd);
		DeviceStore.onResizeEnd(this.onResizeEnd);
		var w = this.getDOMNode().offsetWidth
			, canvas = this.refs.canvas.getDOMNode()
			, ratio = window.devicePixelRatio || 1

		// initialize canvas dimensions
		this.props.canvasWidth = canvas.width = w
		// canvas.height = Math.floor(w/this.props.heightRatio)
		this.signaturePad = new SignaturePad(this.refs.canvas.getDOMNode());

		if (this.props.data) {
			this.signaturePad.fromDataURL(this.props.data);
		}
		if (this.props.signed) {
			this.signaturePad.enabled(false);
		}
		
		this.onResizeEnd();
	}
	componentWillUnmount = () => {
		DeviceStore.offResizeEnd(this.onResizeEnd);
		DeviceStore.offOrientationChange(this.onResizeEnd);
	}
	componentDidUpdate = () => {
		if (this.props.signed) {
			this.signaturePad.enabled(false);
		}
	}
	// Methods
	onResizeEnd = () => {
		var canvas = this.refs.canvas.getDOMNode()
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

		this.canvasWidth = canvas.width
  }
	reset = (e) => {
		e.preventDefault();
		this.signaturePad.clear();
		this.signaturePad.disabled = false;
		return false;
	}
	done = (e) => {
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
				<canvas className="canvas" ref="canvas"></canvas>
				<div className="buttons">
			 		<TouchButton className="reset" disabled={this.props.signed} onClick={this.reset} text="reset" />
					<TouchButton className="done" disabled={this.props.signed} onClick={this.done} text="done" />
				</div>
			</div>
		);
	}
}

export default Signature;