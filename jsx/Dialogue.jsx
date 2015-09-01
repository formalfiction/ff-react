/** @jsx React.DOM */
var React = require('React');

/*
 * A Basic Dialogue with an accept button
 */

var TouchButton = require('./TouchButton');

var Dialogue = React.createClass({
	propTypes : {
		acceptButtonTitle : React.PropTypes.string,
		// Accept Handler
		onAccept : React.PropTypes.func.isRequired,
		message : React.PropTypes.string,
		modal : React.PropTypes.bool,
		title : React.PropTypes.string,
	},

	// Component lifecycle methods
	getDefaultProps : function () {
		return {
			title : "Uh Oh.",
			message : "Something has gone wrong.",
			acceptButtonTitle : "Ok",
		}
	},

	// Render
	render : function () {
		var className= this.props.modal ? "modal dialogue" : "dialogue";
		return(
			<div className={className}>
				<h3 className="title">{this.props.title}</h3>
				<p className="message">{this.props.message}</p>
				<TouchButton className="accept" onClick={this.props.onAccept} text={this.props.acceptButtonTitle} />
			</div>
		)
	}
});

module.exports = Dialogue;