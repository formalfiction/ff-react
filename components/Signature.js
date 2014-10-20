/** @jsx React.DOM */
/*
 * SignaturePad takes user signatures & spits out
 * Data-URI's of that information.
 * 
 */

var SignaturePad = require('../deps/SignaturePad');

var Signature = React.createClass({displayName: 'Signature',
	// Component Lifecycle methods
	componentDidMount : function () {
		this.signaturePad = new SignaturePad(this.refs.canvas.getDOMNode());
		if (this.props.data) {
			this.signaturePad.fromDataURL(this.props.data);
		}
		if (this.props.signed) {
			this.signaturePad.enabled(false);
		}
		window.onresize = this.resizeCanvas;
		this.resizeCanvas();
	},
	componentWillUnmount : function () {
		window.onresize = undefined;
	},
	componentDidUpdate : function () {
		if (this.props.signed) {
			this.signaturePad.enabled(false);
		}
	},
	// Methods
	resizeCanvas : function () {
    var ratio =  window.devicePixelRatio || 1
    	, canvas = this.refs.canvas.getDOMNode();
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
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
			React.DOM.div( {className:"signature"}, 
				React.DOM.canvas( {className:"canvas", ref:"canvas"}),
				React.DOM.div( {className:"buttons"}, 
			 		React.DOM.button( {className:"reset", disabled:this.props.signed, onClick:this.reset, onTouchEnd:this.reset}, "reset"), 
					React.DOM.button( {className:"done", disabled:this.props.signed, onClick:this.done, onTouchEnd:this.done}, "done")
				)
			)
		);
	}
});

module.exports= Signature;