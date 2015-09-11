import { Component, PropTypes } from 'react';

class ValidSelectInput extends Component {
	static propTypes = {
		// gotta name yo fields
		name : PropTypes.string.isRequired,
		// field value
		value : PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		// array of potential options
		options : PropTypes.array,
		// use either onChange or onValueChange. Not both
		// std onChange event
		onChange : PropTypes.func,
		// onChange in the form of (value, name)
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
		className : PropTypes.string
	}
	static defaultProps = {
		name : "",
		placeholder : "",
		options : [],
		valid : undefined,
		message : undefined,
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
		var props = this.props
			, label
			, options = []

		if (props.label) {
			label = <label>{props.label}</label>
		}

		props.options.forEach(function(opt, i){
			options.push(<option value={opt.value} key={i}>{opt.name}</option>)
		});

		return(
			<div className={props.className + " valdSelectInput field"}>
				<select disabled={props.disabled} type="text" name={props.name} placeholder={props.placeholder} value={props.value} onFocus={props.onFocus} onBlur={props.onBlur} onChange={this.onChange}>
					{options}
				</select>
				<span className="indicator ss-icon">{props.valid ? "checked" : ((!props.valid && props.value) ? "close" : "") }</span>
				<span className="message">{props.valid ? props.message : "" }</span>
			</div>
		);
	}
}

export default ValidSelectInput;