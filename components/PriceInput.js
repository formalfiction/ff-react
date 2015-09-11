import { Component, PropTypes } from 'react';
import $ from 'jquery';
import maskMoney from '../deps/MaskMoney';

/* 
 *
 * Text input field with currency input mask.
 * relies on the MaskMoney Plugin for currency-formatting logic
 *
 * @todo - Bring this MaskMoney Lib within the component
 * 
 */

class PriceInput extends Component {
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
		value : 0
	}

	// Component Lifecycle
	componentDidMount = () => {
		$(this.refs["input"].getDOMNode()).maskMoney({ prefix : "$", suffix : this.props.suffix }).maskMoney('mask',this.props.value / 100);
	}
	componentDidUpdate = () => {
		$(this.refs["input"].getDOMNode()).maskMoney('mask',this.props.value / 100);
	}

	// Event handlers
	onKeyUp = (e) => {
		var val = Math.floor($(e.target).maskMoney('unmasked')[0] * 100);
		// e.target.value = val;

		if (val != this.props.value) {
			if (typeof this.props.onChange === "function") {
				this.props.onChange(e, val, this.props.name);
			}
			if (typeof this.props.onValueChange === "function") {
				this.props.onValueChange(val, this.props.name)
			}
		}
	}
	onChange = (e) => {
		// this.props.onChange(e);
	}

	// Render Methods
	render() {
		var disabled = (this.props.editable !== undefined || this.props.editable !== false);

		return (
			<div className={"field priceInput " + this.props.className}>
				<input ref="input"
					name={this.props.name}
					type="text"
					pattern="[0-9]*" 
					value={this.props.value}
					onChange={this.onChange}
					onKeyUp={this.onKeyUp} />
			</div>
		)
	}
}

export default PriceInput;