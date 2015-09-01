/** @jsx React.DOM */
var React = require('React');

var ValidTouchInput = require('./ValidTouchInput')
	, _ = require('underscore');

var AddressInput = React.createClass({displayName: "AddressInput",
	propTypes : {
		name : React.PropTypes.string.isRequired,
		value : React.PropTypes.object.isRequired,
		onValueChange : React.PropTypes.func.isRequired,
		showValidation : React.PropTypes.bool.isRequired,
		showNameField : React.PropTypes.bool
	},

	// lifecycle
	getDefaultProps : function () {
		return {
			className : "addressInput",
			showValidation : true,
			showNameField : false
		}
	},

	// statics
	statics : {
		// @todo
		valid : function (address) {
			return true
		}
	},

	// methods
	nameValid : function () {
		return true;
	},
	lineOneValid : function () {
		return true;
	},
	lineTwoValid : function () {
		return true;
	},
	cityValid : function () {
		return true;
	},
	countryValid : function () {
		return true;
	},
	regionValid : function () {
		return true;
	},
	postalCodeValid : function () {
		return true;
	},

	// event handlers
	onValueChange : function (value, name) {
		if (typeof this.props.onValueChange === "function") {
			var address = _.extend({}, this.props.value);
			address[name] = value;
			this.props.onValueChange(address, this.props.name);
		}
	},

	// render
	render : function () {
		var address = this.props.value || {}
			, nameField
			, label;

		if (this.props.showNameField) {
			nameField = React.createElement(ValidTouchInput, {label: "name", className: "validTextInput field name", name: "name", onValueChange: this.onValueChange, valid: this.nameValid(), showValidation: this.props.showValidation})
		}
		if (this.props.label) {
			label = React.createElement("label", null, this.props.label)
		}
		return (
			React.createElement("div", React.__spread({},  this.props), 
				label, 
				nameField, 
				React.createElement(ValidTouchInput, {label: "line 1", placeholder: "123 abc st.", className: "validTextInput field lineOne", value: address.lineOne, name: "lineOne", onValueChange: this.onValueChange, valid: this.lineOneValid(), showValidation: this.props.showValidation}), 
				React.createElement(ValidTouchInput, {label: "line 2", placeholder: "suite 100", className: "validTextInput field lineTwo", value: address.lineTwo, name: "lineTwo", onValueChange: this.onValueChange, valid: this.lineTwoValid(), showValidation: this.props.showValidation}), 
				React.createElement(ValidTouchInput, {label: "city", className: "validTextInput field city", value: address.city, name: "city", onValueChange: this.onValueChange, valid: this.cityValid(), showValidation: this.props.showValidation}), 
				React.createElement(ValidTouchInput, {label: "state/province", className: "validTextInput field region", value: address.region, name: "region", onValueChange: this.onValueChange, valid: this.regionValid(), showValidation: this.props.showValidation}), 
				React.createElement(ValidTouchInput, {label: "country", className: "validTextInput field country", value: address.country, name: "country", onValueChange: this.onValueChange, valid: this.countryValid(), showValidation: this.props.showValidation}), 
				React.createElement(ValidTouchInput, {label: "zip/postal", className: "validTextInput field postalCode", value: address.postalCode, name: "postalCode", onValueChange: this.onValueChange, valid: this.postalCodeValid(), showValidation: this.props.showValidation})
			)
		);
	}
});

module.exports = AddressInput;