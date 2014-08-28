/*
 * SignaturePad takes user signatures & spits out
 * Data-URI's of that information.
 * @jsx React.DOM */

var SignaturePad = require('../../libs/SignaturePad');

var Signature = React.createClass({
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
			buttons = <div className="signatureControls">
					<a className="right" href="#" onClick={this.done}>done</a>
			 		<a href="#" onClick={this.reset}>reset</a> 
			</div>
		}
		return (
			<div className="signature">
				<canvas className="canvas" ref="canvas"></canvas>
				{buttons}
			</div>
		);
	}
});

module.exports= Signature;