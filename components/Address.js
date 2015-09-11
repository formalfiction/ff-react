import { Component, PropTypes } from 'react';

class Address extends Component {
	static propTypes = {
		value : PropTypes.object.isRequired
	}

	// methods
	string = () => {
		const address = this.props.value
		let out = "";

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
	}

	render() {
		return (
			<div className="address">
				<p>{this.string()}</p>
			</div>
		);
	}
});

export default Address;