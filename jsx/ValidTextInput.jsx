/** @jsx React.DOM */

var ValidTextInput = React.createClass({
	propTypes : {
		// className will set on the containing div
		className : React.PropTypes.string,
		// enable / disable the field
		disabled : React.PropTypes.bool,
		// leave undefined to display no message
		message : React.PropTypes.string,
		// gotta name yo fields
		name : React.PropTypes.string.isRequired,
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
			, indicator
			, message
			, className = props.className || "";

		if (props.showValidation) {
			indicator = (props.valid) ? "checked" : "close";
			message = (props.valid) ? "" : props.message
			className = (props.valid) ? "valid" : "invalid"
		}

		return(
			<div className={className + " validTextInput field"}>
				<input disabled={props.disabled} type="text" name={props.name} onFocus={props.onFocus} onBlur={props.onBlur} onChange={this.onChange} placeholder={props.placeholder} value={props.value} />
				<span className="indicator ss-icon">{indicator}</span>
				<span className="message">{message }</span>
			</div>
		);
	}
});

module.exports = ValidTextInput;