var Store = require("./Store")
	, DeviceConstants = require("../constants/DeviceConstants");

var DeviceStore = Store.extend({
	window : {
		lastScrollY : window.scrollY,
		lastScrollX : window.scrollX
	},

	onScroll : function (fn) {
		this.on(DeviceConstants.DEVICE_SCROLL, fn);
	},
	offScroll : function (fn) {
		this.removeListener(DeviceConstants.DEVICE_SCROLL, fn);
	},
	_emitScroll : function (e) {
		this.emit(DeviceConstants.DEVICE_SCROLL, e);
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
	}
});

// Turn DeviceStore into a singleton
DeviceStore = new DeviceStore();

window.addEventListener("scroll", function (e){
	e.lastScrollY = DeviceStore.window.lastScrollY;
	e.lastScrollX = DeviceStore.window.lastScrollX;

	DeviceStore._emitScroll(e);

	DeviceStore.window.lastScrollY = window.scrollY;
	DeviceStore.window.lastScrollX = window.scrollX;
});

window.addEventListener("resize", function(e){
	DeviceStore._emitResize(e);
});

window.addEventListener("orientationchange", function(e){
	DeviceStore._emitOrientationChange(e);
});

// export a singleton
module.exports = DeviceStore