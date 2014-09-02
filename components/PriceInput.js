/** @jsx React.DOM */
/*
 * Text input field with currency input mask.
 * relies on the MaskMoney Plugin for currency-formatting logic
 *
 * @todo - Bring this MaskMoney Thing innline in-house
 * 
 */

var maskMoney = require('../deps/MaskMoney');

var PriceInput = React.createClass({displayName: 'PriceInput',
	componentDidMount : function () {
		$(this.refs["input"].getDOMNode()).maskMoney({ prefix : "$", suffix : this.props.suffix });
	},
	componentDidUpdate : function () {
		$(this.refs["input"].getDOMNode()).maskMoney('mask',this.props.value);
	},
	keyUp : function (e) {
		var val = Math.floor($(e.target).maskMoney('unmasked')[0] * 100);
		if (val != this.props.value) {
			if (typeof this.props.onChange === "function") {
				var obj = {};
				obj[this.props.name] = val;
				this.props.onChange(obj);
			}
		}
	},
	fakeFn : function (e) {
		console.log(e);
		// this.props.onChange(e);
	},
	render : function () {
		var disabled = (this.props.editable !== undefined || this.props.editable !== false);
		return (
			React.DOM.div( {className:"field priceInput " + this.props.className}, 
				React.DOM.input( {ref:"input",
					name:this.props.name,
					type:"text", 
					value:this.props.value,
					onChange:this.fakeFn,
					onKeyUp:this.keyUp} )
			)
		)
	}
});

module.exports = PriceInput;