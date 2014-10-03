/** @jsx React.DOM */

var AutoGrowTextArea = react.createClass({
	propTypes : {

	},
	_change : function () {
		
	},
	render : function () {
		return (
			this.transferPropsTo(<textarea />)
		);
	}
});

module.exports = AutoGrowTextArea;