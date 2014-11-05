/** @jsx React.DOM */

/* Message Box Compnent With an optional Close button */

var Message = React.createClass({displayName: 'Message',
	propTypes : {
		message : React.PropTypes.string.isRequired,
		title : React.PropTypes.string
	},

	// Component lifecycle methods
	getDefaultProps : function () {
		return {
			title : "Not Found",
			message : "We Couldn&#39;t find what you were looking for."
		}
	},

	// Methods
	goBack : function () {
		if (window.history) {
			window.history.back()
		}
	},

	// Render
	render : function () {
		return React.transferPropsTo(React.DOM.div( {className:"message"}, 
																		React.DOM.p(null, this.props.message)
																	)
																);
	}
});

module.exports = FourOhFour;