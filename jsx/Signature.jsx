/** @jsx React.DOM */
/*
 * SignaturePad takes user signatures & spits out
 * Data-URI's of that information.
 * 
 */

var SignaturePad = require('../deps/SignaturePad');

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
		this.signaturePad.enabled(true);
		return false;
	},
	done : function (e) {
		e.preventDefault();
		if (typeof this.props.done === "function") {
			this.props.done(this.signaturePad.toDataURL());
		}
		this.signaturePad.enabled(false);
		return false;
	},
	render : function () {
		return (
			<div className="signature">
				<canvas className="canvas" ref="canvas"></canvas>
				<div className="buttons">
			 		<button className="reset" disabled={this.props.signed} onClick={this.reset} onTouchEnd={this.reset}>reset</button> 
					<button className="done" disabled={this.props.signed} onClick={this.done} onTouchEnd={this.done}>done</button>
				</div>
			</div>
		);
	}
});

module.exports= Signature;