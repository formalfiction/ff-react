/** @jsx React.DOM */
/*
 * SignaturePad takes user signatures & spits out
 * Data-URI's of that information.
 * 
 */

var DeviceStore = require('../stores/DeviceStore')

var SignaturePad = require('../deps/SignaturePad')
	, TouchButton = require('./TouchButton');

var Signature = React.createClass({
	propTypes : {
		// optional dataURI to populate signature with
		data : React.PropTypes.string,
		// flag for if the canvas has been signed
		// (contains any drawing)
		signed : React.PropTypes.bool,
		// completion handler func
		done : React.PropTypes.func.isRequired,
		// heightRatio defaults to 0.5, yeilding an aspect ratio of 2:1
		heightRatio : React.PropTypes.number,
	},

	// sure, let's cheat a bunch
	canvasWidth : undefined,

	// Component Lifecycle methods
	getDefaultProps : function () {
		return {
			signed : false,
			heightRatio : 2.5
		}
	},
	componentDidMount : function () {
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
	},
	componentWillUnmount : function () {
		DeviceStore.offResizeEnd(this.onResizeEnd);
		DeviceStore.offOrientationChange(this.onResizeEnd);
	},
	componentDidUpdate : function () {
		if (this.props.signed) {
			this.signaturePad.enabled(false);
		}
	},
	// Methods
	onResizeEnd : function () {
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
  },
	reset : function (e) {
		e.preventDefault();
		this.signaturePad.clear();
		this.signaturePad.disabled = false;
		return false;
	},
	done : function (e) {
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
	},
	render : function () {
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
});

module.exports= Signature;