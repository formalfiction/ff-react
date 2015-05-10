/** @jsx React.DOM */

var TouchTextarea = require('./TouchTextarea')

var ValidTextareaInput = React.createClass({displayName: 'ValidTextareaInput',
	propTypes : {
		// gotta name yo fields
		name : React.PropTypes.string.isRequired,
		// field value
		value : React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
		// a delay (in ms) before the component will respond.
		// good for when ui is changing under a ghost click
		initialInputDelay : React.PropTypes.number,
		// Textarea's autogrow property
		autoGrow : React.PropTypes.bool,
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
		className : React.PropTypes.string,
		// explicit control over weather or not to display validation
		showValidation : React.PropTypes.bool,
		// flag for controlling display of a √ or x icon along with validation
		// defaults to false (not-showing)
		showValidationIcon : React.PropTypes.bool
	},

	// Component lifecycle methods
	getDefaultProps : function () {
		return {
			name : "",
			value : "",
			placeholder : "",
			className : " validTextArea field",
			valid : undefined,
			message : undefined,
			showValidationIcon : false
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
		var validClass = "", label, message, icon;

		if (this.props.label) {
			label = React.createElement("label", null, this.props.label)
		}

		if (this.props.showValidation) {
			if (this.props.showValidationIcon) {
				icon = React.createElement("span", {className: "validation icon ss-icon"}, this.props.valid ? "checked" : "close")
			}
			message = (this.props.valid) ? "" : this.props.message
			validClass = (this.props.valid) ? "valid " : "invalid "
		}

		return(
			React.createElement("div", React.__spread({},  this.props, {className: validClass + this.props.className}), 
				label, 
				React.createElement(TouchTextarea, {initialInputDelay: this.props.initialInputDelay, disabled: this.props.disabled, name: this.props.name, placeholder: this.props.placeholder, value: this.props.value, onChange: this.onChange}), 
				icon, 
				React.createElement("span", {className: "message"}, message)
			)
		);
	}
});

module.exports = ValidTextareaInput;