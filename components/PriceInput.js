/** @jsx React.DOM */

/* 
 * @jQuery
 *
 * Text input field with currency input mask.
 * relies on the MaskMoney Plugin for currency-formatting logic
 *
 * @todo - Bring this MaskMoney Lib within the component
 * 
 */

var maskMoney = require('../deps/MaskMoney');

var PriceInput = React.createClass({displayName: 'PriceInput',
	propTypes : {
		// Value for the field
		value : React.PropTypes.number.isRequired,
		// Name for the field
		name : React.PropTypes.string.isRequired,
		// Raw onChange Method
		onChange : React.PropTypes.func,
		// Will call with (value, key) on change
		onValueChange : React.PropTypes.func
	},

	// Component Lifecycle
	componentDidMount : function () {
		$(this.refs["input"].getDOMNode()).maskMoney({ prefix : "$", suffix : this.props.suffix }).maskMoney('mask',this.props.value / 100);
	},
	componentDidUpdate : function () {
		$(this.refs["input"].getDOMNode()).maskMoney('mask',this.props.value / 100);
	},
	getDefaultProps : function () {
		return {
			value : 0
		};
	},

	// Event handlers
	onKeyUp : function (e) {
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
	},
	onChange : function (e) {
		// this.props.onChange(e);
	},

	// Render Methods
	render : function () {
		var disabled = (this.props.editable !== undefined || this.props.editable !== false);

		return (
			React.createElement("div", {className: "field priceInput " + this.props.className}, 
				React.createElement("input", {ref: "input", 
					name: this.props.name, 
					type: "text", 
					pattern: "[0-9]*", 
					value: this.props.value, 
					onChange: this.onChange, 
					onKeyUp: this.onKeyUp})
			)
		)
	}
});

module.exports = PriceInput;