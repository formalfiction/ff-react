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

var PercentageInput = React.createClass({displayName: "PercentageInput",
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
	getDefaultProps : function () {
		return {
			value : 0,
			name : "percentageInput"
		};
	},

	// Event handlers
	onChange : function (e) {
		var val = +e.target.value / 100;

		if (val != this.props.value) {
			if (typeof this.props.onChange === "function") {
				this.props.onChange(e, val, this.props.name);
			}
			if (typeof this.props.onValueChange === "function") {
				this.props.onValueChange(val, this.props.name)
			}
		}
	},

	// Render Methods
	render : function () {
		var disabled = (this.props.editable !== undefined || this.props.editable !== false)
			, val = this.props.value || 0;

		return (
			React.createElement("div", {className: "field percentageInput " + this.props.className}, 
				React.createElement("input", {ref: "input", 
					name: this.props.name, 
					type: "text", 
					pattern: "[0-9]*", 
					value: val * 100, 
					onChange: this.onChange})
			)
		)
	}
});

module.exports = PercentageInput;