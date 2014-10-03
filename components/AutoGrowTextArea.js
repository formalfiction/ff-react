/** @jsx React.DOM */

var AutoGrowTextArea = React.createClass({displayName: 'AutoGrowTextArea',
	propTypes : {

	},
	_change : function () {
		
	},
	render : function () {
		return (
			this.transferPropsTo(React.DOM.textarea(null ))
		);
	}
});

module.exports = AutoGrowTextArea;