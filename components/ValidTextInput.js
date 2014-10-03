/** @jsx React.DOM */

var ValidTextInput = React.createClass({displayName: 'ValidTextInput',
	propTypes : {
		// gotta name yo fields
		name : React.PropTypes.string.isRequired,
		// field value
		value : React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
		// std onChange event
		onChange : React.PropTypes.func,
		// placeholder text
		placeholder : React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.number]),
		// leave undefined to display no valid
		valid : React.PropTypes.bool,
		// leave undefined to display no message
		message : React.PropTypes.string,
		// enable / disable the field
		disabled : React.PropTypes.bool,
		// set this to add a label element above the field
		label : React.PropTypes.string,
		// className will set on the containing div
		className : React.PropTypes.string
	},
	getDefaultProps : function () {
		return {
			name : "",
			placeholder : "",
			valid : undefined,
			message : undefined,
		}
	},
	render : function () {
		var props = this.props
			, label;

		if (props.label) {
			label = React.DOM.label(null, props.label)
		}
		return(
			React.DOM.div( {className:props.className + " validTextInput field"}, 
				label,
				React.DOM.input( {disabled:props.disabled, type:"text", name:props.name, placeholder:props.placeholder, value:props.value, onChange:self.handleChange} ),
				React.DOM.span( {className:"indicator ss-icon"}, props.valid ? "checked" : "close" ),
				React.DOM.span( {className:"message"}, props.valid ? props.message : "" )
			)
		);
	}
});

module.exports = ValidTextInput;