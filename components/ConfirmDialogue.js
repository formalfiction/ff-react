/** @jsx React.DOM */

/* 
 * Generic Conrim Action Dialogue
 */

var TouchButton = require('./TouchButton');

var ConfirmDialogue = React.createClass({displayName: 'ConfirmDialogue',
	propTypes : {
		confirmButtonTitle : React.PropTypes.string,
		cancelButtonTitle : React.PropTypes.string,
		// Cancel Handler
		onCancel : React.PropTypes.func.isRequired,
		// Delete Handler
		onConfirm : React.PropTypes.func.isRequired,
		title : React.PropTypes.string,
		message : React.PropTypes.string,
	},

	// Component lifecycle methods
	getDefaultProps : function () {
		return {
			title : "Are You Sure?",
			message : "This action cannot be undone.",
			cancelButtonTitle : "Cancel",
			confirmButtonTitle : "Confirm"
		};
	},

	// Render
	render : function () {
		return (
			React.createElement("div", {className: "confirm modal"}, 
				React.createElement("h2", null, this.props.title), 
				React.createElement("p", null, this.props.message), 
				React.createElement("div", {className: "buttons"}, 
					React.createElement(TouchButton, {onClick: this.props.onCancel, text: this.props.cancelButtonTitle}), 
					React.createElement(TouchButton, {onClick: this.props.onConfirm, text: this.props.confirmButtonTitle})
				)
			)
		);
	}
});

module.exports = ConfirmDialogue;