import { Component, PropTypes } from 'react';
import TouchTextarea from './TouchTextarea';

class ValidTextareaInput extends Component {
	static propTypes = {
		// gotta name yo fields
		name : PropTypes.string.isRequired,
		// field value
		value : PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		// a delay (in ms) before the component will respond.
		// good for when ui is changing under a ghost click
		initialInputDelay : PropTypes.number,
		// Textarea's autogrow property
		autoGrow : PropTypes.bool,
		// use either onChange or onValueChange. Not both.
		// std onChange event
		onChange : PropTypes.func,
		// onChange in the form (value, name)
		onValueChange : PropTypes.func,
		// placeholder text
		placeholder : PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
		// leave undefined to display no valid
		valid : PropTypes.bool,
		// leave undefined to display no message
		message : PropTypes.string,
		// enable / disable the field
		disabled : PropTypes.bool,
		// className will set on the containing div
		className : PropTypes.string,
		// explicit control over weather or not to display validation
		showValidation : PropTypes.bool,
		// flag for controlling display of a √ or x icon along with validation
		// defaults to false (not-showing)
		showValidationIcon : PropTypes.bool
	}
	static defaultProps = {
		name : "",
		value : "",
		placeholder : "",
		className : " validTextArea field",
		valid : undefined,
		message : undefined,
		showValidationIcon : false
	}
	// handlers
	onChange = (e) => {
		if (typeof this.props.onChange === "function") {
			this.props.onChange(e);
		}
		if (typeof this.props.onValueChange === "function") {
			this.props.onValueChange(e.target.value, this.props.name);
		}
	}

	// Render
	render() {
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
				<TouchTextarea initialInputDelay={this.props.initialInputDelay} disabled={this.props.disabled} name={this.props.name} placeholder={this.props.placeholder} value={this.props.value} onChange={this.onChange} />
				{icon}
				<span className="message">{message}</span>
			</div>
		);
	}
}

export default ValidTextareaInput;