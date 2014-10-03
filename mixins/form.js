
var PropTypes = React.PropTypes;

var form = {

	propTypes : {
		onSave : PropTypes.func,
	},

	// remember to set "modelName"
	// modelName : "model",

	// Remember to set "getInitialState"
	// getInitialState : function () {
	// 	return { [modelName] : model };
	// },
	
	// Remember to set "fields" object
	// fields : [],

	_validate : function () {
		var self = this
			, model = this.state[this.modelName]
			, errors = this.state.formErrors || {}
			, generalErr
			, valid = true;
		this.fields.forEach(function(field){
			if (typeof field.validate === "function") {
				var msg = field.validate(model[field.name]);
				if (msg) {
					errors["_" + field.name + "ErrMsg"] = msg;
					errors["_" + field.name + "Valid"] = false;
					valid = false;
				} else {
					errors["_" + field.name + "ErrMsg"] = null;
					errors["_" + field.name + "Valid"] = true;
				}
			}
		});

		if (typeof this.validate === "function") {
			generalErr = this.validate()
		}

		this.setState({
			error : generalErr,
			formErrors : errors
		});

		return valid;
	},

	handleChange : function (e) {
		var self = this
			, name = $(e.target).attr('name')
			, model = this.state[this.modelName]
			, errors = this.state.formErrors || {}
			, val = e.target.value
			, field;
		
		// Grab the field
		for (var i=0; i<this.fields.length; i++) {
			if (name == this.fields[i].name) {
				field = this.fields[i];
				break;
			}
		}
		if (field) {
			// check for "filter" method on field to modify value on change
			if (typeof field.filter === "function") {
				val = field.filter.call(self, val);
			}

			// if we're invalid (and have a validate fn on the field),
			// keep checking for validity & add to state Object
			if (errors["_" + field.name + "Valid"] != true && typeof field.validate === "function") {
				var msg = field.validate(val);
				if (msg) {
					errors["_" + field.name + "ErrMsg"] = msg;
					errors["_" + field.name + "Valid"] = false;
				} else {
					errors["_" + field.name + "ErrMsg"] = null;
					errors["_" + field.name + "Valid"] = true;
				}
			}

			this.setState({ formErrors : errors });

		}
		if (typeof this.onChange === "function") {
			this.onChange(val, name);
		}
	},

	handleBlur : function (e) {
		var self = this, errors = this.state.formErrors;
		// check for "validate" method on field to modify validty state on blur
		this.fields.forEach(function(field){
			if (name === field.name && typeof field.validate === "function") {
				var msg = field.validate(self.state[field.name]);
				if (msg) {
					errors["_" + field.name + "ErrMsg"] = msg;
					errors["_" + field.name + "Valid"] = false;
				} else {
					errors["_" + field.name + "ErrMsg"] = null;
					errors["_" + field.name + "Valid"] = true;
				}
			}
		});

		self.setState({ formErrors : errors });
	},

	handleCancel : function (e) {
		e.preventDefault();
		// first check for passed in "onCancel" prop
		if (typeof this.props.onCancel === "function") {
			this.props.onCancel();

		// if not, check for local "onSave" method
		} else if (typeof this.onCancel === "function") {
			this.onCancel();
		}

		return false;
	},

	handleSubmit : function (e) {
		var data = this.state[this.modelName];

		e.preventDefault();

		if (this._validate() !== true) {
			return false;
		}

		// first check for passed in "onSave" prop
		if (typeof this.props.onSubmit === "function") {
			this.props.onSubmit(data);

		// if not, check for local "onSave" method
		} else if (typeof this.onSubmit === "function") {
			this.onSubmit(data);
		}

		return false;
	},
};

module.exports = form;