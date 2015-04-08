var Store = require("./Store")
	, DeviceConstants = require("../constants/DeviceConstants");

var DeviceStore = Store.extend({
	onScroll : function (fn) {
		this.on(DeviceConstants.DEVICE_SCROLL, fn);
	},
	offScroll : function (fn) {
		this.removeListener(DeviceConstants.DEVICE_SCROLL, fn);
	},
	emitScroll : function (e) {
		this.emit(DeviceConstants.DEVICE_SCROLL, e);
	}
});

// Turn DeviceStore into a singleton
DeviceStore = new DeviceStore();

window.addEventListener("scroll", function (e){
	DeviceStore.emitScroll(e);
});



// export a singleton
module.exports = DeviceStore