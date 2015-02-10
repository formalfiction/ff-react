/** @jsx React.DOM */
/*
 * SignaturePad takes user signatures & spits out
 * Data-URI's of that information.
 * 
 */

var SignaturePad = require('../deps/SignaturePad')
	, TouchButton = require('./TouchButton');

var Signature = React.createClass({displayName: "Signature",
	// Component Lifecycle methods
	componentDidMount : function () {
		this.signaturePad = new SignaturePad(this.refs.canvas.getDOMNode());
		if (this.props.data) {
			this.signaturePad.fromDataURL(this.props.data);
		}
		if (this.props.signed) {
			this.signaturePad.enabled(false);
		}

		window.addEventListener('onresize', this.resizeCanvas);
		window.addEventListener('orientationchange', this.resizeCanvas);

		// call resize to determine initial dimensions
		this.resizeCanvas();
	},
	componentWillUnmount : function () {
		window.removeEventListener('onresize', this.resizeCanvas);
		window.removeEventListener('orientationchange', this.resizeCanvas);
	},
	componentDidUpdate : function () {
		if (this.props.signed) {
			this.signaturePad.enabled(false);
		}
	},
	// Methods
	resizeCanvas : function () {
    var ratio =  window.devicePixelRatio || 1
    	, canvas = this.refs.canvas.getDOMNode()
    	, w = canvas.offsetWidth * ratio
    	, h = canvas.offsetHeight * ratio
    	, wRatio = (w / h) * ratio;

    // console.log(w, h, wRatio);
    
    canvas.width = w
    canvas.height = h

    canvas.getContext("2d").scale(ratio, ratio);
	},
	reset : function (e) {
		e.preventDefault();
		this.signaturePad.clear();
		this.signaturePad.enabled(true);
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
		this.signaturePad.enabled(false);
		return false;
	},
	render : function () {
		return (
			React.createElement("div", {className: "signature"}, 
				React.createElement("canvas", {className: "canvas", ref: "canvas"}), 
				React.createElement("div", {className: "buttons"}, 
			 		React.createElement(TouchButton, {className: "reset", disabled: this.props.signed, onClick: this.reset, text: "reset"}), 
					React.createElement(TouchButton, {className: "done", disabled: this.props.signed, onClick: this.done, text: "done"})
				)
			)
		);
	}
});

module.exports= Signature;