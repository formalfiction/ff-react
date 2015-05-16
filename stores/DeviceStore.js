var Store = require("./Store")
	, DeviceConstants = require("../constants/DeviceConstants");

var resizeTimer;

var DeviceStore = Store.extend({
	scrolling : {
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
		e.lastScrollY = DeviceStore.scrolling.lastScrollY;
		e.lastScrollX = DeviceStore.scrolling.lastScrollX;

		DeviceStore.emit(DeviceConstants.DEVICE_SCROLL, e);
		
		DeviceStore.scrolling.lastScrollY = e.target.scrollTop;
		DeviceStore.scrolling.lastScrollX = e.target.scrollLeft;
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
});

// Turn DeviceStore into a singleton
DeviceStore = new DeviceStore();

window.addEventListener("scroll", DeviceStore._emitScroll);

window.addEventListener("resize", function(e){
	DeviceStore._emitResize(e);

	clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
  	DeviceStore.emit(DeviceConstants.DEVICE_RESIZE_END, e);
  }, 250);
});

window.addEventListener("orientationchange", function(e){
	DeviceStore._emitOrientationChange(e);
});

// export a singleton
module.exports = DeviceStore