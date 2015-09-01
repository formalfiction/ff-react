/** @jsx React.DOM */
var React = require('React');

var Address = React.createClass({displayName: "Address",
	propTypes : {
		value : React.PropTypes.object.isRequired
	},

	string : function () {
		var address = this.props.value
			, out = "";

		if (!address) { return ""; }

		if (address.name) { out += address.name + "\n" }
		if (address.lineOne) { out += address.lineOne + "\n" }
		if (address.lineTwo) { out += address.lineTwo + "\n" }
		if (address.city) { out += address.city }
		if (address.region) { out += ", " + address.region }
		if (address.country) { out += " " + address.country }
		out += "\n"
		if (address.postalCode) { out += " " + address.postalCode }

		return out;
	},

	render : function () {
		var address = this.props.value;
		return (
			React.createElement("div", {className: "address"}, 
				React.createElement("p", null, this.string())
			)
		);
	}
});

module.exports = Address;