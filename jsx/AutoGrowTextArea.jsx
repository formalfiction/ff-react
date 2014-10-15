/** @jsx React.DOM */

/* Autogrow is a text area that grows & shrinks 
 * to fit the height of it's text value
 */

var AutoGrowTextArea = React.createClass({
	propTypes : {
		name : React.PropTypes.string.isRequired,
		// Use either onChange, or onValueChange. Not both.
		// Raw change event
		onChange : React.PropTypes.func,
		// change handler in the form (value, name)
		onValueChange : React.PropTypes.func,
		value : React.PropTypes.string.isRequired,
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