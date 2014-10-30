/** @jsx React.DOM */

/* Autogrow is a text area that grows & shrinks 
 * to fit the height of it's text value
 * 
 * to work properly, the text area must be configured against
 * an "offset" that accounts for the difference between the
 * scrollHeight & extra height generated through styling
 * 
 */

var AutoGrowTextArea = React.createClass({
	propTypes : {
		// the height before modification
		defaultHeight : React.PropTypes.number,
		name : React.PropTypes.string.isRequired,
		// offset is to deal with height problems created
		// through styling. should be a positive number
		offset : React.PropTypes.number.isRequired,
		// Use either onChange, or onValueChange. Not both.
		// Raw change event
		onChange : React.PropTypes.func,
		// change handler in the form (value, name)
		onValueChange : React.PropTypes.func,
		value : React.PropTypes.string.isRequired,
	},

	// Lifecycle
	getDefaultProps : function () {
		return {
			height : 25,
			offset : 4,
		}
	},
	getInitialState : function () {
		return {
			height : this.props.defaultHeight
		}
	},

	// Event Handlers
	onChange : function (e) {
		var value = e.target.value
			, newHeight = this.getDOMNode().scrollHeight - this.props.offset;

		if (newHeight != this.state.height) {
			this.setState({ height : newHeight });
		}

		if (typeof this.props.onChange === "function") {
			this.props.onChange(e);
		}
		if (typeof this.props.onValueChange === "function") {
			this.props.onValueChange(value, this.props.name);
		}
	},

	// Render
	style : function () {
		return {
			height : this.state.height
		}
	},
	render : function () {
		return (
			this.transferPropsTo(<textarea className="autogrow" style={this.style()} onChange={this.onChange} />)
		);
	}
});

module.exports = AutoGrowTextArea;