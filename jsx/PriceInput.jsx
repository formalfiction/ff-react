/** @jsx React.DOM */
var React = require('React')

var PriceInput = React.createClass({
	propTypes : {
		// Value for the field
		value : React.PropTypes.number.isRequired,
		// Name for the field
		name : React.PropTypes.string.isRequired,
		// Will call with (value, key) on change
		onValueChange : React.PropTypes.func,
		// flag for if values should be passed in & returned as
		// cents (integers). It's highly reccommended you track money
		// in cents:
		centsValue : React.PropTypes.bool
	},

	// Component Lifecycle
	getDefaultProps : function () {
		return {
			value : 0,
			centsValue : true
		};
	},

	statics : {
		// Mask takes our number value & turns it into a string for display
		mask : function (value) {
			// ripped thousands separator regex from:
			// http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
			return "$" + (value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		},
		// Unmask undoes masking, turning a displayed string back into a number
		unmask : function (value) {
			value = +value.replace(/\,/g,'').replace('$','');
			return (typeof value === "number" && !isNaN(value)) ? value : undefined;
		}
	},

	// handlers
	forceEndInput : function (e) {
		var el = e.target;
		el.selectionStart = el.selectionEnd = el.value.length;
	},
	onChange : function (e) {
		var value = PriceInput.unmask(e.target.value)
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
	},

	// Render Methods
	render : function () {
		var disabled = (this.props.editable !== undefined || this.props.editable !== false),
				value = this.props.centsValue ? this.props.value / 100 : this.props.value;

		return (
			<div className={"field priceInput " + this.props.className}>
				<input name={this.props.name}
					type="text"
					pattern="[0-9]*" 
					value={PriceInput.mask(value)}
					onChange={this.onChange}
					onKeyUp={this.forceEndInput}
					onMouseUp={this.forceEndInput} />
			</div>
		)
	}
});

module.exports = PriceInput;