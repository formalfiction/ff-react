/** @jsx React.DOM */

/* Standard Not-Found Component with a go-back button. */

var FourOhFour = React.createClass({displayName: 'FourOhFour',
	propTypes : {
		message : React.PropTypes.string,
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
		return (
			React.createElement("div", {className: "fourOhFour error"}, 
				React.createElement("h3", null, this.props.title), 
				React.createElement("p", null, this.props.message), 
				React.createElement("button", {onClick: this.reloadPage, onTouchEnd: this.goBack}, "Reload")
			)
		);
	}
});

module.exports = FourOhFour;