/** @jsx React.DOM */
var React = require('React');

/* Message Box Compnent */

var Message = React.createClass({displayName: "Message",
	propTypes : {
		message : React.PropTypes.string.isRequired,
	},

	// Component lifecycle methods
	getDefaultProps : function () {
		return {
			message : "We Couldn&#39;t find what you were looking for."
		}
	},

	// Render
	render : function () {
		return (
			React.createElement("div", {className: "message"}, 
				React.createElement("p", null, this.props.message)
			)
		);
	}
});

module.exports = Message;