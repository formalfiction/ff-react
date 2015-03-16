var EventEmitter = require('events').EventEmitter
  , _ = require('underscore')

var CHANGE_EVENT = 'change'
  , ERROR_EVENT = 'error'
  , MESSAGE_EVENT = 'message';

var storeProto = {
  emitChange: function(data) {
    this.emit(CHANGE_EVENT, data);
  },
  /**
   * @param {function} callback
   */
  onChange: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  /**
   * @param {function} callback
   */
  offChange: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  emitError : function (err) {
    this.emit(ERROR_EVENT, err);
  },
  onError : function (callback) {
    this.on(ERROR_EVENT, callback);
  },
  offError : function (callback) {
    this.removeListener(ERROR_EVENT, callback);
  },
  
  emitMessage : function (msg) {
    this.emit(MESSAGE_EVENT, msg);
  },
  onMessage : function (callback) {
    this.on(MESSAGE_EVENT, callback);
  },
  offMessage : function (callback) {
    this.removeListener(MESSAGE_EVENT, callback);
  },
}

function Store (obj) {
	return _.extend({}, storeProto, EventEmitter.prototype, obj);
}


module.exports = Store;