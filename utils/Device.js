var Store = require("./Store")
	, DeviceConstants = require("../constants/DeviceConstants");

var resizeTimer;

var Device = Store.extend({
	scrolling : {
		lastScrollY : window.scrollY,
		lastScrollX : window.scrollX
	},

	getWidth : function() {
		return window.innerWidth;
	},
	getHeight : function () {
		return window.innerHeight;
	},
	getPixelRatio : function () {
		return window.devicePixelRatio;
	},

	onScroll : function (fn) {
		this.on(DeviceConstants.DEVICE_SCROLL, fn);
	},
	offScroll : function (fn) {
		this.removeListener(DeviceConstants.DEVICE_SCROLL, fn);
	},
	_emitScroll : function (e) {
		e.lastScrollY = Device.scrolling.lastScrollY;
		e.lastScrollX = Device.scrolling.lastScrollX;

		Device.emit(DeviceConstants.DEVICE_SCROLL, e);
		
		Device.scrolling.lastScrollY = e.target.scrollTop;
		Device.scrolling.lastScrollX = e.target.scrollLeft;
	},

	onOrientationChange : function (fn) {
		this.on(DeviceConstants.DEVICE_ORIENTATION_CHANGE, fn);
	},
	offOrientationChange : function (fn) {
		this.removeListener(DeviceConstants.DEVICE_ORIENTATION_CHANGE, fn);
	},
	_emitOrientationChange : function (e) {
		this.emit(DeviceConstants.DEVICE_ORIENTATION_CHANGE, e);
	},

	onResize : function (fn) {
		this.on(DeviceConstants.DEVICE_RESIZE, fn);
	},
	offResize : function (fn) {
		this.removeListener(DeviceConstants.DEVICE_RESIZE, fn);
	},
	_emitResize : function (e) {
		this.emit(DeviceConstants.DEVICE_RESIZE, e);
	},

	onResizeEnd : function (fn) {
		this.on(DeviceConstants.DEVICE_RESIZE_END, fn);
	},
	offResizeEnd : function (fn) {
		this.removeListener(DeviceConstants.DEVICE_RESIZE_END, fn);
	},

	_emitKeyDown : function (e) {
		this.emit(DeviceConstants.DEVICE_KEYDOWN, e);
	},
	onKeyDown : function (fn) {
		this.on(DeviceConstants.DEVICE_KEYDOWN, fn);
	},
	offKeyDown : function (fn) {
		this.removeListener(DeviceConstants.DEVICE_KEYDOWN, fn);
	},

	_emitKeyUp : function (e) {
		this.emit(DeviceConstants.DEVICE_KEYUP, e);
	},
	onKeyUp : function (fn) {
		this.on(DeviceConstants.DEVICE_KEYUP, fn);
	},
	offKeyUp : function (fn) {
		this.removeListener(DeviceConstants.DEVICE_KEYUP, fn);
	}
});

// Turn Device into a singleton
Device = new Device();

window.addEventListener("scroll", Device._emitScroll);

window.addEventListener("resize", function(e){
	Device._emitResize(e);

	clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
  	Device.emit(DeviceConstants.DEVICE_RESIZE_END, e);
  }, 250);
});

window.addEventListener("orientationchange", function(e){
	Device._emitOrientationChange(e);
});

window.addEventListener("keydown", function(e){
	Device._emitKeyDown(e);
});

window.addEventListener("keyup", function(e){
	Device._emitKeyUp(e);
});

// export a singleton
module.exports = Device