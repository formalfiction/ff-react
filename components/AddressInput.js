import React, { Component, PropTypes } from 'react';
import ValidTouchInput from './ValidTouchInput';
import * as _ from 'underscore';

class AddressInput extends Component {
	static propTypes = {
		name : PropTypes.string.isRequired,
		value : PropTypes.object.isRequired,
		onValueChange : PropTypes.func.isRequired,
		showValidation : PropTypes.bool.isRequired,
		showNameField : PropTypes.bool
	}
	static defaultProps = {
		className : "addressInput",
		showValidation : true,
		showNameField : false
	}

	static valid(address) {
		return true
	}

	// methods
	nameValid(){
		return true;
	}
	lineOneValid(){
		return true;
	}
	lineTwoValid(){
		return true;
	}
	cityValid(){
		return true;
	}
	countryValid(){
		return true;
	}
	regionValid(){
		return true;
	}
	postalCodeValid(){
		return true;
	}

	// handlers
	onValueChange = (value, name) => {
		if (typeof this.props.onValueChange === "function") {
			var address = _.extend({}, this.props.value);
			address[name] = value;
			this.props.onValueChange(address, this.props.name);
		}
	}

	// render
	render() {
		var address = this.props.value || {}
			, nameField
			, label;

		if (this.props.showNameField) {
			nameField = <ValidTouchInput label="name" className="validTextInput field name" name="name" onValueChange={this.onValueChange} valid={this.nameValid()} showValidation={this.props.showValidation} />
		}
		if (this.props.label) {
			label = <label>{this.props.label}</label>
		}
		return (
			<div {...this.props}>
				{label}
				{nameField}
				<ValidTouchInput label="line 1" placeholder="123 abc st." className="validTextInput field lineOne" value={address.lineOne} name="lineOne" onValueChange={this.onValueChange} valid={this.lineOneValid()} showValidation={this.props.showValidation} />
				<ValidTouchInput label="line 2" placeholder="suite 100" className="validTextInput field lineTwo" value={address.lineTwo} name="lineTwo" onValueChange={this.onValueChange} valid={this.lineTwoValid()} showValidation={this.props.showValidation} />
				<ValidTouchInput label="city" className="validTextInput field city" value={address.city} name="city" onValueChange={this.onValueChange} valid={this.cityValid()} showValidation={this.props.showValidation} />
				<ValidTouchInput label="state/province" className="validTextInput field region" value={address.region} name="region" onValueChange={this.onValueChange} valid={this.regionValid()} showValidation={this.props.showValidation} />
				<ValidTouchInput label="country" className="validTextInput field country" value={address.country} name="country" onValueChange={this.onValueChange} valid={this.countryValid()} showValidation={this.props.showValidation} />
				<ValidTouchInput label="zip/postal" className="validTextInput field postalCode" value={address.postalCode} name="postalCode" onValueChange={this.onValueChange} valid={this.postalCodeValid()} showValidation={this.props.showValidation} />
			</div>
		);
	}
}

export default AddressInput;