import React from 'react';
import _ from 'underscore';
import ValidTextInput from './ValidTextInput';
import ValidTextareaInput from './ValidTextareaInput';
import AddressInput from './AddressInput';
import PercentageInput from './PercentageInput';
import PriceInput from './PriceInput';

/*
 * ** NOT A COMPONENT **
 *
 * A function for use when rendering a component.
 * It's intended to reduce redundant code.
 * It should be called in the render method 
 * with an array of objects containing:
 *
 * name - form field name (required)
 * type - type of form field (required)
 * label - human-readable label (optional)
 * filter - a function that filters the output (optional)
 * validate - a function that validates the field (optional)
 * 
 * Types
 * hidden, text, & textarea are all supported
 * fieldset - a container set for other fields.
 * 						requires two values: 
 * 							• name - Fieldset label
 * 							• fields -  (array of fields)
 *
 */


// Default Form Fields takes an array of objects
// with label, name, type, and placeholder values
export default function BasicFormFields (model, fieldObjs, context) {
	let fields = [];

	if (typeof fieldObjs !== "object") { return fields; }
	fieldArray.call(context, model, fieldObjs, 0, fields);

	return fields;
};

function fieldArray(model, fields, j, result) {
	fields.forEach((obj,i) => {
		if (_.isArray(obj)){
			fieldArray.call(this, model, obj, j + "." + i, result);
		} else {
			result.push(handleField.call(this, model, obj, j + "." + i, result));
		}
	});

	return result;
}

function handleField (model, obj, i, fields) {
	let self = this, value = model[obj.name]
	
	switch (obj.type) {
	case "hidden":
		fields.push(<input type="hidden" name={obj.name} value={value} />);
		break;
	case "text":
		fields.push(<ValidTextInput
					key={i}
					name={obj.name}
					value={value}
					label={obj.label}
					className={obj.className}
					placeholder={obj.placeholder}
					disabled={obj.disabled}
					onValueChange={self.onValueChange}
					showValidation={!self.props.hideValidation}
					message={self.props.validationErrors ? self.props.validationErrors[obj.name] : ""}
					valid={self.props.validationErrors ? !self.props.validationErrors[obj.name] : true} />);
		break;
	case "textarea":
		fields.push(
				<ValidTextareaInput
					key={i}
					name={obj.name}
					value={value}
					label={obj.label}
					className={obj.className}
					placeholder={obj.placeholder}
					disabled={obj.disabled}
					onValueChange={self.onValueChange}
					showValidation={!self.props.hideValidation}
					message={self.props.validationErrors ? self.props.validationErrors[obj.name] : ""}
					valid={self.props.validationErrors ? !self.props.validationErrors[obj.name] : true} />);
		break;
	case "address":
		fields.push(
			<AddressInput
				key={i}
				name={obj.name}
				value={value}
				label={obj.label}
				className={obj.className}
				placeholder={obj.placeholder}
				disabled={obj.disabled}
				onValueChange={self.onValueChange}
				showValidation={!self.props.hideValidation}
				message={self.props.validationErrors ? self.props.validationErrors[obj.name] : ""}
				valid={self.props.validationErrors ? !self.props.validationErrors[obj.name] : true} />);
		break;
	case "price":
		fields.push(
			<PriceInput
				key={i}
				name={obj.name}
				value={value}
				label={obj.label}
				className={obj.className}
				placeholder={obj.placeholder}
				disabled={obj.disabled}
				onValueChange={self.onValueChange}
				showValidation={!self.props.hideValidation}
				message={self.props.validationErrors ? self.props.validationErrors[obj.name] : ""}
				valid={self.props.validationErrors ? !self.props.validationErrors[obj.name] : true} />
		);
		break;
	case "percent":
		fields.push(
			<PercentageInput
				key={i}
				name={obj.name}
				value={value}
				label={obj.label}
				showValidation={!self.props.hideValidation}
				className={obj.className}
				placeholder={obj.placeholder}
				disabled={obj.disabled}
				message={self.props.validationErrors ? self.props.validationErrors[obj.name] : ""}
				valid={self.props.validationErrors ? !self.props.validationErrors[obj.name] : true} />
		);
		break;
	case "fieldSet":
		let subFields = [];
		fieldArray.call(this, obj['fields'], i, subFields);
		fields.push(
			<div className="fieldSet" key={i}>
				<hr />
				<h3 className="span10">{obj['name']}</h3>
				{subFields}
			</div>
		);
		break;
	}
}