var Store = require("ff-react/stores/Store")
	, DeviceConstants = require("../constants/DeviceConstants");


var DeviceStore = Store({
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

window.addEventListener("scroll", function (e){
	DeviceStore.emitScroll(e);
});



module.exports = DeviceStore;