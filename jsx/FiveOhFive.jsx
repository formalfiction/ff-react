/** @jsx React.DOM */
var React = require('React');

/* Basic 505 Error Component */

var FiveOhFive = React.createClass({
	propTypes : {
		message : React.PropTypes.string,
		title : React.PropTypes.string,
	},

	// Component lifecycle methods
	getDefaultProps : function () {
		return {
			message : "Something has gone wrong.",
			title : "Awe Shucks",
		}
	},

	// Methods
	reloadPage : function () {
		window.location.reload()
	},
	
	// Render
	render : function () {
		return (
			<div className="fiveOhFive error">
				<h3>{this.props.title}</h3>
				<p>{this.props.message}</p>
				<button onClick={this.reloadPage} onTouchEnd={this.reloadPage}>Reload</button>
			</div>
		);
	}
});

module.exports = FiveOhFive