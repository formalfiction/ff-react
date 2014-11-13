/** @jsx React.DOM */

var ValidTextareaInput = React.createClass({displayName: 'ValidTextareaInput',
	propTypes : {
		// gotta name yo fields
		name : React.PropTypes.string.isRequired,
		// field value
		value : React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
		// use either onChange or onValueChange. Not both.
		// std onChange event
		onChange : React.PropTypes.func,
		// onChange in the form (value, name)
		onValueChange : React.PropTypes.func,
		// placeholder text
		placeholder : React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.number]),
		// leave undefined to display no valid
		valid : React.PropTypes.bool,
		// leave undefined to display no message
		message : React.PropTypes.string,
		// enable / disable the field
		disabled : React.PropTypes.bool,
		// className will set on the containing div
		className : React.PropTypes.string
	},

	// Component lifecycle methods
	getDefaultProps : function () {
		return {
			name : "",
			placeholder : "",
			valid : undefined,
			message : undefined,
		}
	},

	// Event Handlers
	onChange : function (e) {
		if (typeof this.props.onChange === "function") {
			this.props.onChange(e);
		}
		if (typeof this.props.onValueChange === "function") {
			this.props.onValueChange(e.target.value, this.props.name);
		}
	},

	// Render
	render : function () {
		var props = this.props
			, label;

		return(
			React.createElement("div", {className: props.className + " validTextArea field"}, 
				label, 
				React.createElement("textarea", {disabled: props.disabled, type: "text", name: props.name, placeholder: props.placeholder, value: props.value, onChange: this.onChange}), 
				React.createElement("span", {className: "indicator ss-icon"}, props.valid ? "checked" : ((!props.valid && props.value) ? "close" : "") ), 
				React.createElement("span", {className: "message"}, props.valid ? props.message : "")
			)
		);
	}
});

module.exports = ValidTextareaInput;