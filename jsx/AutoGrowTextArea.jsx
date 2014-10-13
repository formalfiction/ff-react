/** @jsx React.DOM */

var AutoGrowTextArea = React.createClass({
	propTypes : {
		// 
		value : React.PropTypes.string.isRequired,
		// Name of the field
		name : React.PropTypes.string.isRequired,
		// 
		onValueChange : React.PropTypes.func,
	},

	// Methods	
	setHeight : function () {

	},

	// Event Handlers
	onChange : function (e) {
		var value = e.target.value;

		this.setHeight();

		if (typeof this.props.onChange === "function") {
			this.props.onChange(e);
		}
		if (typeof this.props.onValueChange) {
			this.props.onValueChange(value, this.props.name);
		}
	},

	// Render Methods
	render : function () {
		return (
			this.transferPropsTo(<textarea onChange={this.onChange} />)
		);
	}
});

module.exports = AutoGrowTextArea;