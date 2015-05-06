/** @jsx React.DOM */

var TouchInput = require('./TouchInput');

var ValidTouchInput = React.createClass({
	propTypes : {
		// gotta name yo fields
		name : React.PropTypes.string.isRequired,

		// the type of field. defaults to "text"
		type : React.PropTypes.string,
		
		// className will set on the containing div
		className : React.PropTypes.string,
		// enable / disable the field
		disabled : React.PropTypes.bool,
		// a delay (in ms) before the component will respond.
		// good for when ui is changing under a ghost click
		initialInputDelay : React.PropTypes.number,
		// if specificed, will place a label above the input field
		label : React.PropTypes.string,
		// validation message. leave undefined to display no message
		// only appears on invalid
		message : React.PropTypes.string,
		// placeholder text
		placeholder : React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.number]),
		// leave undefined to display no valid
		valid : React.PropTypes.bool,
		// field value
		value : React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
		// use either onChange or onValueChange. Not both
		// std onChange event
		onChange : React.PropTypes.func,
		// onChange in the form of (value, name)
		onValueChange : React.PropTypes.func,
		// master switch for showing / hiding validation
		showValidation : React.PropTypes.bool,
		// flag for controlling display of a √ or x icon along with validation
		// defaults to false (not-showing)
		showValidationIcon : React.PropTypes.bool
	},

	// Component lifecycle methods
	getDefaultProps : function () {
		return {
			className : "validTextInput field",
			name : "",
			placeholder : "",
			valid : undefined,
			message : undefined,
			initialInputDelay : 500,
			showValidationIcon : false,
			type : "text"
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
			label = <label>{this.props.label}</label>
		}

		if (this.props.showValidation) {
			if (this.props.showValidationIcon) {
				icon = <span className="validation icon ss-icon">{this.props.valid ? "checked" : "close" }</span>
			}
			message = (this.props.valid) ? "" : this.props.message
			validClass = (this.props.valid) ? "valid " : "invalid "
		}

		return(
			<div {...this.props} className={validClass + this.props.className}>
				{label}
				<TouchInput initialInputDelay={this.props.initialInputDelay} disabled={this.props.disabled} type={this.props.type} name={this.props.name} onFocus={this.props.onFocus} onBlur={this.props.onBlur} onChange={this.onChange} placeholder={this.props.placeholder} value={this.props.value} />
				{icon}
				<span className="message">{message}</span>
			</div>
		);
	}
});

module.exports = ValidTouchInput;