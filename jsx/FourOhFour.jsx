/** @jsx React.DOM */

/* Standard Not-Found Component with a go-back button. */

var FourOhFour = React.createClass({
	propTypes : {
		message : React.PropTypes.string,
		title : React.PropTypes.string
	},

	// Component lifecycle methods
	getDefaultProps : function () {
		return {
			title : "Not Found",
			message : "We Couldn't find what you were looking for."
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
		return (
			<div className="fourOhFour">
				<h3>{this.props.title}</h3>
				<p>{this.props.message}</p>
				<button onClick={this.reloadPage} onTouchEnd={this.goBack}>Reload</button>
			</div>
		);
	}
});

module.exports = FourOhFour;