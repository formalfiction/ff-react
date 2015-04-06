var Store = require('./Store')
	, _ = require('underscore');

/*
 * StandardStore is an extension on Store that provides standard
 * behaviours for storing a model
 *
 */

// replace the first matched element in an array 
// @param list {array} the list to modify
// @param fn {function} truth test function
// @param element {whatever} the elememt to add
// @return true if modified, otherwise false
function replace(list, fn, element) {
	for (var i=0,e; e=list[i]; i++) {
		if (fn(e)) {
			list.splice(i, 1, element);
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
	// internal models array.
	_models : [],

	// @private
	// @param {string} id - the id or client id (cid) of the object being retrieved
	// private method because it returns a reference to the object in the store. 
	_one : function (id) {
		return _.find(this._models, idMatcher(id));
	},
	
	// @param {string} id - the id or client id (cid) of the object being retrieved
	// public method returns a clone of the object
	// to prevent unintended modification of the stored model
	one : function (id) {
		return _.clone(this._one(id));
	},

	// get all models in this store
	// returns a clone of the array to prevent
	// unintended modification
	// @return {array} - copy of all models
	all : function () {
		return _.clone(this._models);
	},

	// check to see weather a model is valid. call
	// syncronoously for simple true / false, or provide a
	// callback for error reporting.
	// Feel free to override this method, keeping it's format.
	// @param model {object} - the model to validate
	// @param cb {function} - optional callback for errors
	// @return true if valid, error if not
	valid : function (model, cb) {
		var errors = [];

		// all models must be objects
		if (!_.isObject(model)) { 
			errors.push("model must be an object");
			if (_.isFunction(cb)) {
				cb(errors);
			}
			return false;
		}

		// must have either an id or cid property
		if (!model.id && !model.cid) { 
			errors.push("model must have an id or cid property");
		}

		if (_.isFunction(cb)) {
			cb(errors);
		}

		return (errors.length === 0);
	},

	// add a model to the store
	// if it's already in the store, the stored model will be updated
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
		if (replace(this._models, idMatcher(model.id || model.cid), model)) {
			return model;
		}

		// otherwise push to the end of the list
		this._models.push(model);

		return model;
	},

	// update a stored model
	// @param {object} model - the model object to be updated
	update : function (model) {
		if (!this.valid(model)) { 
			return false;
		}
		return replace(this._models, idMatcher(model.id || model.cid || ''), model);
	},

	// @param model {object|string|number} - either the model object to be removed OR
	// 																			 just it's id / cid
	remove : function (model) {
		// support passing in just the id
		if (_.isString(model) || _.isNumber(model)) {
			model = { id : model };
		}
		return remove(this._models, idMatcher(model.id || model.cid || ''));
	},
});

module.exports = StandardStore;