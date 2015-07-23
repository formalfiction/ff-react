var Store = require('./Store')
	, _ = require('underscore');

/*
 * StandardStore is an extension on Store that provides standard
 * behaviours for storing a model
 *
 */

// update the first matched element in an array
// using underscore's extend method
// @param list {array} the list of objects
// @param fn {function} truth test function
// @param element {anything} updates to make
// @return true if modified, otherwise false
function update(list, fn, element) {
	for (var i=0,e; e=list[i]; i++) {
		if (fn(e)) {
			list[i] = _.extend(list[i], element)
			return true;
		}
	}
	return false;
}

// like update, but replaces outright instead of extending
function replace(list, fn, element) {
		for (var i=0,e; e=list[i]; i++) {
		if (fn(e)) {
			list[i] = element
			return true;
		}
	}
	return false;
}

// remove the first element in an array
// that passes the truth test function
// @param list {array} - array to modify
// @param fn {function} - truth test function
// @return true if modified, otherwise false
function remove(list, fn) {
	for (var i=0,e; e=list[i]; i++) {
		if (fn(e)) {
			list.splice(i, 1);
			return true;
		}
	}
	return false;
}

// @param id {string|number} - id we're looking for
// @return {func(model)} - 
function idMatcher (id) {
	return function (m) {
		return (m.id === id || m.cid === id);
	}
}

var StandardStore = Store.extend({
	// @private
	constructor : function () {
		this._models = [];
		return this;
	},

	// @private
	// internal models array. will be defined on construction
	_models : undefined,

	// @private - internal "one" method that returns a reference to the stored
	// model object
	// @param {string} id - the id or client id (cid) of the object being retrieved
	// private method because it returns a direct reference to the object in the store. 
	_one : function (id) {
		if (!id) { return false; }
		return _.find(this._models, idMatcher(id));
	},
	
	// public method returns a clone of the object
	// to prevent unintended modification of the stored model
	// @param {string} id - the id or client id (cid) of the object being retrieved
	// @return {object|undefined} - the model object, or undefined if not found
	one : function (id) {
		if (!id) { return undefined; }
		return _.clone(this._one(id));
	},

	// get all models in this store
	// returns a clone of the array to prevent
	// unintended modification
	// @return {array} - copy of all models
	all : function () {
		return _.clone(this._models)
	},

	// check to see weather a model is valid. call
	// syncronously for simple true / false, or provide a
	// callback for error reporting.
	// Feel free to override this method, keeping it's format.
	// @param model {object} - the model to validate
	// @param cb {function} - optional callback for errors
	// @return true if valid, error if not
	valid : function (model, cb) {
		var errors = [];
		return this.isModelObject(model, cb);
	},

	// add a model to the store
	// if it's already in the store, the stored model will be updated.
	// the object must have either an id or cid field
	// @param {object} model - the model object to add to the store
	add : function (model) {
		if (_.isArray(model)) {
			_.each(model, this.add, this);
			return model;
		}

		// make sure we're valid
		if (!this.valid(model)) {
			return false;
		}

		// check to see if we already have the model
		if (update(this._models, idMatcher(model.id || model.cid), model)) {
			return model;
		}

		// otherwise push to the end of the list
		this._models.push(model);

		return model;
	},

	// change a stored model
	// @param {object} model - the model object to be changed
	change : function (model) {
		if (!this.valid(model)) { return false; }
		return update(this._models, idMatcher(model.id || model.cid || ''), model);
	},

	// replace a stored model
	// @param {object} model - the model object to be changed
	replace : function (model) {
		if (!this.valid(model)) { return false; }
		return replace(this._models, idMatcher(model.id || model.cid || ''), model);
	},

	// @param model {object|string|number} - either the model object to be removed OR
	// 																			 just it's id / cid
	remove : function (model) {
		if (!model) { return false; }
		// support passing in just the id
		if (_.isString(model) || _.isNumber(model)) {
			model = { id : model };
		}
		return remove(this._models, idMatcher(model.id || model.cid || ''));
	},

	// helper func to see if something is a model object.
	// call syncronously for simple true / false, or provide a
	// callback for error reporting.
	// Feel free to override this method, keeping it's format.
	// @param model {object} - the model to validate
	// @return {boolean} - weather it's a model object or not
	isModelObject : function (model) {
		// all models must be objects
		if (!_.isObject(model)) { 
			return false;
		}

		// must have either an id or cid property
		if (!model.id && !model.cid) { 
			return false;
		}

		return true;
	},

	// tries to format obj as an "id object"
	// @param arg {object|string|number}
	// @return {object|undefined} in the form { id : [arg] }
	//														undefined if the conversion cannot be made
	idObject : function (obj) {
		if (!obj) { return undefined; }
		if (this.isModelObject(obj)) { return obj; }
		if (_.isString(obj) || _.isNumber(obj)) { return { id : obj}; }
		return undefined;
	}
});

module.exports = StandardStore;