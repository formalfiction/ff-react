/** @jsx React.DOM */

/* Message Box Compnent With an optional Close button */

var Message = React.createClass({
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
		return React.transferPropsTo(<div className="message">
																		<p>{this.props.message}</p>
																	</div>
																);
	}
});

module.exports = FourOhFour;