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
			React.DOM.div( {className:"fiveOhFive error"}, 
				React.DOM.h3(null, this.props.title),
				React.DOM.p(null, this.props.message),
				React.DOM.button( {onClick:this.reloadPage, onTouchEnd:this.reloadPage}, "Reload")
			)
		);
	}
});

module.exports = FiveOhFive