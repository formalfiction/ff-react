var Store = require('./store');


function onResize() {

}

function onOrientationChange() {

}

var DeviceStore = Store({
	addListeners : function () {
		window.addEventListener("resize", onResize);
		window.addEventListener("orientationchange", onResize);

	},
	removeListeners : function () {
		window.removeEventListener("resize", DeviceStore.onResize);
	},

	// subscribe to all events
	onChange : function () {

	},


	name : function () {

	},
	type : function () {

	},
	size : function () {

	},
	orientation : function () {
		
	}
});




module.exports = DeviceStore;