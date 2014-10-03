/** @jsx React.DOM */
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

var _ = require('underscore')

var ValidTextInput = require('./ValidTextInput');

// Default Form Fields takes an array of objects
// with label, name, type, and placeholder values
function BasicFormFields (fieldObjs) {
	var self = this, fields = [], type;

	if (typeof fieldObjs !== "object") { return fields; }

	fieldArray.call(self, fieldObjs, 0, fields);

	return fields;
};

function fieldArray(fields, j, result) {
	var self = this;

	fields.forEach(function(obj,i){
		if (_.isArray(obj)){
			fieldArray.call(self, obj, i + j, result);
		} else {
			result.push(handleField.call(self, obj, i, result));
		}
	});

	return result;
}

function handleField (obj, i, fields) {
	var self = this
		, model = self.state[self.modelName] || {}
		, value = model[obj.name];
	
	if (obj.type === "hidden") {
		fields.push(<input type="hidden" name={obj.name} value={value} />)
	} else if (obj.type === "text") {
		fields.push(
			<div className="field" key={i}>
				<ValidTextInput
					label={obj.label}
					value={value}
					onChange={self.handleChange}
					placeholder={obj.placeholder}
					message ={self.state["_" + obj.name + "ErrMsg"]}
					valid={self.state["_" + obj.name + "Valid"]} />
			</div>);
	} else if (obj.type === "textarea") {
		fields.push(
			<div className="field" key={i}>
				<label>{obj.label}</label>
				<textarea disabled={obj.disabled} name={obj.name} placeholder={obj.placeholder} value={value} onChange={self.handleChange}></textarea>
				<span>{self.state["_" + obj.name + "ErrMsg"]}</span>
				<span>{(self.state["_" + obj.name + "Valid"] === false) ? "Invalid" : "" }</span>
			</div>);
	} else if (obj.type === "fieldSet") {
		var subFields = [];
		fieldArray.call(self, obj['fields'], i, subFields);
		fields.push(<div className="fieldSet">
			<hr />
			<h3>{obj['name']}</h3>
			{subFields}
		</div>);
	}
}

module.exports = BasicFormFields;