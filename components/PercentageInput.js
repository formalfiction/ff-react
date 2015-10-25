import React, { Component, PropTypes } from 'react';

class PercentageInput extends Component {
	static propTypes = {
		// Value for the field
		value : PropTypes.number.isRequired,
		// Name for the field
		name : PropTypes.string.isRequired,
		// Raw onChange Method
		onChange : PropTypes.func,
		// Will call with (value, key) on change
		onValueChange : PropTypes.func
	}
	static defaultProps = {
		value : 0,
		name : "percentageInput"
	}

	// handlers
	onChange = (e) => {
		var val = +e.target.value / 100;
		if (isNaN(val)) { val = 0; }

		if (val != this.props.value) {
			if (typeof this.props.onChange === "function") {
				this.props.onChange(e, val, this.props.name);
			}
			if (typeof this.props.onValueChange === "function") {
				this.props.onValueChange(val, this.props.name)
			}
		}
	}

	// Render Methods
	render() {
		var disabled = (this.props.editable !== undefined || this.props.editable !== false)
			, val = this.props.value || 0;

		return (
			<div className={"field percentageInput " + this.props.className}>
				<input ref="input"
					name={this.props.name}
					type="text"
					pattern="[0-9]*" 
					value={val * 100}
					onChange={this.onChange} />
			</div>
		)
	}
}

export default PercentageInput;