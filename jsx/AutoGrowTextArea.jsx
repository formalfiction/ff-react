/** @jsx React.DOM */

var AutoGrowTextArea = React.createClass({
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