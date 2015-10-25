var EventEmitter = require('events').EventEmitter
  , _ = require('underscore')

// big, universal contants for store events
var CHANGE_EVENT = 'change'
  , ERROR_EVENT = 'error'
  , MESSAGE_EVENT = 'message';

function Store () {}

_.extend(Store.prototype, EventEmitter.prototype, {
  // empty constructor func
  constructor : function () {},

  emitChange: function(data) {
    return this.emit(CHANGE_EVENT, data);
  },
  /**
   * @param {function} callback
   * @return {int} number of current listeners
   */
  onChange: function(callback) {
    this.on(CHANGE_EVENT, callback);
    return this.listeners(CHANGE_EVENT).length;
  },
  /**
   * @param {function} callback
   * @return {int} number of change event listeners
   */
  offChange: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
    return this.listeners(CHANGE_EVENT).length;
  },

  emitError : function (err) {
    return this.emit(ERROR_EVENT, err);
  },
  /**
   * @param {function} callback
   * @return {int} number of change event listeners
   */
  onError : function (callback) {
    this.on(ERROR_EVENT, callback);
    return this.listeners(ERROR_EVENT).length;
  },
  /**
   * @param {function} callback
   * @return {int} number of change event listeners
   */
  offError : function (callback) {
    this.removeListener(ERROR_EVENT, callback);
    return this.listeners(ERROR_EVENT).length;
  },
  
  emitMessage : function (msg) {
    return this.emit(MESSAGE_EVENT, msg);
  },
  /**
   * @param {function} callback
   * @return {int} number of change event listeners
   */
  onMessage : function (callback) {
    this.on(MESSAGE_EVENT, callback);
    return this.listeners(MESSAGE_EVENT).length;
  },
  /**
   * @param {function} callback
   * @return {int} number of change event listeners
   */
  offMessage : function (callback) {
    this.removeListener(MESSAGE_EVENT, callback);
    return this.listeners(MESSAGE_EVENT).length;
  }
});

// straight up ripoff of the Backbone.js extend method
Store.extend = function extend (protoProps, staticProps) {
  var parent = this;
  var child;

  // The constructor function for the new subclass is either defined by you
  // (the "constructor" property in your `extend` definition), or defaulted
  // by us to simply call the parent's constructor.
  if (protoProps && _.has(protoProps, 'constructor')) {
    child = protoProps.constructor;
  } else {
    child = function(){ return parent.apply(this, arguments); };
  }

  // Add static properties to the constructor function, if supplied.
  _.extend(child, parent, staticProps);

  // Set the prototype chain to inherit from `parent`, without calling
  // `parent`'s constructor function.
  var Surrogate = function(){ this.constructor = child; };
  Surrogate.prototype = parent.prototype;
  child.prototype = new Surrogate;

  // Add prototype properties (instance properties) to the subclass,
  // if supplied.
  if (protoProps) _.extend(child.prototype, protoProps);

  // Set a convenience property in case the parent's prototype is needed
  // later.
  child.__super__ = parent.prototype;

  return child;
}


module.exports = Store;