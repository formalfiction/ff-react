import React, { Component, PropTypes } from 'react';
import cronizer from  'cronizer';

/* CronInput takes a human-readable string input & tries to
 * create a cron pattern from it.
 * Leverages cronizer module to do the heavy lifting of cron
 * interpretation
 */

class CronInput extends Component {
	static propTypes = {
		name : PropTypes.string.isRequired,
		// className will set on the containing div
		className : PropTypes.string,
		// enable / disable the field
		disabled : PropTypes.bool,
		// onChange : PropTypes.func,
		onValueChange : PropTypes.func,
		// placeholder text
		placeholder : PropTypes.string,
		showPattern : PropTypes.bool,
		// leave undefined to display no validation
		valid : PropTypes.bool,
		// an object in the form:
		// { input : *input string*, pattern : *cron pattern* }
		value : PropTypes.object,
	}
	static defaultProps = {
		className : "cronInput",
		placeholder : "eg. Every Other Tuesday",
		showPattern : false,
		value : { input : "", pattern : undefined }
	}

	// Event Handlers
	onChange = (e) => {
		if (typeof this.props.onValueChange === "function") {
			this.props.onValueChange({ input : e.value,  });
		}
	}
	onFocus = (e) => {

	}
	onBlur = (e) => {

	}

	// render
	validation() {
		var valid = "";
		return valid;
	}

	render() {
		const { input, pattern, disabled, className, onChange, onFocus, onBlur } = this.props;

		return (
			<div className={className}>
				<input ref="input" 
							 type="text"
							 disabled={disabled}
							 onChange={onChange}
							 onFocus={onFocus}
							 onBlur={onBlur}
							 value={vlaue} />
				<div className="ss-icon">{this.validation()}</div>
				{()=> {
						if (this.props.showPattern) {
							return (
								<div className="pattern">this.props.value.pattern</div>
							);
						}
				}}
			</div>
		);
	}
}

export default CronInput;