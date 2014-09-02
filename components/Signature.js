/** @jsx React.DOM */
/*
 * SignaturePad takes user signatures & spits out
 * Data-URI's of that information.
 * 
 */

var SignaturePad = require('../deps/SignaturePad');

var Signature = React.createClass({displayName: 'Signature',
	componentDidMount : function () {
		this.signaturePad = new SignaturePad(this.refs.canvas.getDOMNode());
		if (this.props.data) {
			this.signaturePad.fromDataURL(this.props.data);
		}
		if (this.props.signed) {
			this.signaturePad.enabled(false);
		} 
	},
	componentDidUpdate : function () {
		if (this.props.signed) {
			this.signaturePad.enabled(false);
		}
	},
	reset : function (e) {
		e.preventDefault();
		this.signaturePad.clear();
		return false;
	},
	done : function (e) {
		e.preventDefault();
		if (typeof this.props.done === "function") {
			this.props.done(this.signaturePad.toDataURL());
		}
		return false;
	},
	render : function () {
		var buttons;
		if (!this.props.signed) {
			buttons = React.DOM.div( {className:"signatureControls"}, 
					React.DOM.a( {className:"right", href:"#", onClick:this.done}, "done"),
			 		React.DOM.a( {href:"#", onClick:this.reset}, "reset") 
			)
		}
		return (
			React.DOM.div( {className:"signature"}, 
				React.DOM.canvas( {className:"canvas", ref:"canvas"}),
				buttons
			)
		);
	}
});

module.exports= Signature;