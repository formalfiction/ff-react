var React = require('React');

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
			, validation = this.state.validation || {}
			, generalErr
			, valid = true;
		this.fields.forEach(function(field){
			if (typeof field.validate === "function") {
				var msg = field.validate(model[field.name]);
				if (msg) {
					validation[field.name + "ErrMsg"] = msg;
					validation[field.name + "Valid"] = false;
					valid = false;
				} else {
					validation[field.name + "ErrMsg"] = null;
					validation[field.name + "Valid"] = true;
				}
			}
		});

		if (typeof this.validate === "function") {
			generalErr = this.validate()
		}

		this.setState({
			error : generalErr,
			validation : validation
		});

		return valid;
	},

	_onFieldChange : function (e) {
		var self = this
			, name = e.target.name
			, model = this.state[this.modelName]
			, validation = this.state.validation || {}
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
			if (validation[field.name + "Valid"] != true && typeof field.validate === "function") {
				var msg = field.validate(val);
				if (msg) {
					validation[field.name + "ErrMsg"] = msg;
					validation[field.name + "Valid"] = false;
				} else {
					validation[field.name + "ErrMsg"] = null;
					validation[field.name + "Valid"] = true;
				}
			}

			this.setState({ validation : validation });

		}
		if (typeof this.onValueChange === "function") {
			this.onValueChange(val, name);
		}
	},

	_onFieldBlur : function (e) {
		var self = this
			, validation = this.state.validation || {}
			, name = e.target.name
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
			// check for "validate" method on field to modify validty state on blur
			if (name === field.name && typeof field.validate === "function") {
				var msg = field.validate(val);
				if (msg) {
					validation[field.name + "ErrMsg"] = msg;
					validation[field.name + "Valid"] = false;
				} else {
					validation[field.name + "ErrMsg"] = null;
					validation[field.name + "Valid"] = true;
				}
			}
		}

		self.setState({ validation : validation });
	},

	_onCancel : function (e) {
		e.preventDefault();
		// first check for passed in "onCancel" prop
		if (typeof this.props.onCancel === "function") {
			this.props.onCancel();
		// if not, check for local "onCancel" method
		} else if (typeof this.onCancel === "function") {
			this.onCancel();
		}

		return false;
	},

	_onSubmit : function (e) {
		var data = this.state[this.modelName];

		e.preventDefault();

		if (this._validate() !== true) {
			if (typeof this.onInvalid === "function") {
				this.onInvalid(e);
			}
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