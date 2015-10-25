import React, { Component, PropTypes } from 'react';

class PriceInput extends Component {
	static propTypes = {
		// Value for the field
		value : PropTypes.number.isRequired,
		// Name for the field
		name : PropTypes.string.isRequired,
		// Raw onChange Method
		onChange : PropTypes.func,
		// Will call with (value, key) on change
		onValueChange : PropTypes.func,
		centsValue : PropTypes.bool
	}
	static defaultProps = {
		value : 0,
		centsValue : true
	}

	// Mask takes our number value & turns it into a string for display
	static mask(value) {
		value || (value = 0)
		// ripped thousands separator regex from:
		// http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
		return "$" + (value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	// Unmask undoes masking, turning a displayed string back into a number
	static unmask(value) {
		value = +value.replace(/\,/g,'').replace('$','');
		return (typeof value === "number") ? value : undefined;
	}

	// Handlers
	forceEndInput = (e) => {
		let el = e.target;
		el.selectionStart = el.selectionEnd = el.value.length;
	}
	onChange = (e) => {
		let value = PriceInput.unmask(e.target.value)
			, prev = this.props.centsValue ? this.props.value / 100 : this.props.value;
		// only do work if the change parses to a number.
		// this will have the effect of ignoring all non-numerical changes
		if (value != undefined) {
			// if the user types a "0" it can only be handled while still expressed as a string
			// as numerical conversion will clobber the change.
			if (e.target.value === PriceInput.mask(value) + "0") {
				value = value * 10;
				if (this.props.centsValue) { value = Math.round(value * 100); }
				this.props.onValueChange(value,this.props.name);	
				return;
			}

			// if the value hasn't gotten smaller, the user has typed in a new
			// number, so we multiply by 10 to column-shift.
			// otherwise, the user has deleted a value, and we should emit
			// the raw change
			if (value == prev) {
				value = value / 10;
			} else {
				value = (value > prev) ? value * 10 : value / 10;
			}
			if (this.props.centsValue) { value = Math.round(value * 100); }
			this.props.onValueChange(value, this.props.name);
		}
	}

	// Render Methods
	render() {
		var disabled = (this.props.editable !== undefined || this.props.editable !== false);
		var value = this.props.centsValue ? this.props.value / 100 : this.props.value;
		return (
			<div className={"field priceInput " + this.props.className}>
				<input ref="input"
					name={this.props.name}
					type="text"
					pattern="[0-9]*" 
					value={PriceInput.mask(value)}
					onKeyUp={this.forceEndInput}
					onMouseUp={this.forceEndInput}
					onChange={this.onChange} />
			</div>
		)
	}
}

export default PriceInput;