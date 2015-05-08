/** @jsx React.DOM */

/*
 * A Basic Dialogue with an accept button
 */

var TouchButton = require('./TouchButton');

var Dialogue = React.createClass({displayName: 'Dialogue',
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
			React.createElement("div", {className: className}, 
				React.createElement("h3", {className: "title"}, this.props.title), 
				React.createElement("p", {className: "message"}, this.props.message), 
				React.createElement(TouchButton, {className: "accept", onClick: this.props.onAccept, text: this.props.acceptButtonTitle})
			)
		)
	}
});

module.exports = Dialogue;