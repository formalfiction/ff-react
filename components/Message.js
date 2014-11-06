/** @jsx React.DOM */

/* Message Box Compnent */

var Message = React.createClass({displayName: 'Message',
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
			React.DOM.div( {className:"message"}, 
				React.DOM.p(null, this.props.message)
			)
		);
	}
});

module.exports = Message;