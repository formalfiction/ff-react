/** @jsx React.DOM */

/* Basic 505 Error Component */

var FiveOhFive = React.createClass({displayName: 'FiveOhFive',
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
			React.createElement("div", {className: "fiveOhFive error"}, 
				React.createElement("h3", null, this.props.title), 
				React.createElement("p", null, this.props.message), 
				React.createElement("button", {onClick: this.reloadPage, onTouchEnd: this.reloadPage}, "Reload")
			)
		);
	}
});

module.exports = FiveOhFive