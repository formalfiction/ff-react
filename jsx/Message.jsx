/** @jsx React.DOM */

/* Message Box Compnent */

var Message = React.createClass({
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
			<div className="message">
				<p>{this.props.message}</p>
			</div>
		);
	}
});

module.exports = Message;