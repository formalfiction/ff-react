/** @jsx React.DOM */
var React = require('React');

/*
 * Clock is used for selecting time values in 15-minute
 * increments. Often used in conjunction with TimePicker.
 *
 * @todo - one day should support arbitrary minute increments
 * 
 */

var hours = ["01","02","03","04","05","06","07","08","09","10","11","12"]
	, minutes = ["00","15","30","45"]
	, phase = ["am","pm"];

var Clock = React.createClass({displayName: "Clock",
	propTypes : {
		name : React.PropTypes.string,
		onValueChange : React.PropTypes.func,
		disabled : React.PropTypes.bool,
		// must be a valid date object
		value : React.PropTypes.object.isRequired
	},
	// Factory Funcs
	// return a up-incrementer
	up : function (unit) {
		var self = this;
		return function (e) {
			var t = new Date(self.props.value);
			e.preventDefault();
			switch (unit) {
				case "hours":
					t.setHours((t.getHours() === 23) ? 0 : t.getHours() + 1)
					break;
				case "minutes":
					t.setMinutes((t.getMinutes() === 45) ? 0 : t.getMinutes() + 15)
					break;
				case "phase":
					t.setHours((t.getHours() < 12) ? t.getHours() + 12 : t.getHours() - 12)
					break;
			}
			t.setYear(self.props.value.getFullYear())
			t.setMonth(self.props.value.getMonth())
			t.setDate(self.props.value.getDate())
			self.onChange.call(self, t);
		}
	},
	// return an down-incrementer
	down : function (unit) {
		var self = this;
		return function(e) {
			var t = new Date(self.props.value);
			e.preventDefault();
			switch (unit) {
				case "hours":
					t.setHours((t.getHours() === 0) ? 23 : t.getHours() - 1)
					break;
				case "minutes":
					t.setMinutes((t.getMinutes() === 0) ? 45 : t.getMinutes() - 15)
					break;
				case "phase":
					t.setHours((t.getHours() < 12) ? t.getHours() - 12 : t.getHours() + 12)
					break;
			}
			t.setYear(self.props.value.getFullYear())
			t.setMonth(self.props.value.getMonth())
			t.setDate(self.props.value.getDate())
			self.onChange.call(self, t);
		}
	},

	// Event Handlers
	onChange : function (value) {
		if (typeof this.props.onChange === "function") {
			this.props.onChange(value);
		} else if (typeof this.props.onValueChange === "function") {
			this.props.onValueChange(value, this.props.name);
		}
	},

	hours : function () {
		var hours = this.props.value.getHours();
		hours = (hours < 12) ? hours : hours - 12;
		if (!hours) {
			hours = "12"
		} else if (hours < 10) {
			hours = "0" + hours;
		}
		return hours;
	},
	minutes : function () {
		return this.props.value.getMinutes() || "00";
	},
	phase : function () {
		return (this.props.value.getHours() < 12) ? "am" : "pm";
	},

	// Render
	render : function () {

		// var values = this._values(this.props.value);

		return (
			React.createElement("div", {className: "clock", onMouseDown: this.props.onMouseDown}, 
				React.createElement("div", {className: "hours segment"}, 
					React.createElement("a", {onClick: this.up("hours"), onTouchEnd: this.up("hours"), className: "ss-icon"}, "ascend"), 
					React.createElement("h5", null, this.hours()), 
					React.createElement("a", {onClick: this.down("hours"), onTouchEnd: this.down("hours"), className: "ss-icon"}, "descend")
				), 
				React.createElement("h5", {className: "separator segment"}, ":"), 
				React.createElement("div", {className: "minutes segment"}, 
					React.createElement("a", {onClick: this.up("minutes"), onTouchEnd: this.up("minutes"), className: "ss-icon"}, "ascend"), 
					React.createElement("h5", null, this.minutes()), 
					React.createElement("a", {onClick: this.down("minutes"), onTouchEnd: this.down("minutes"), className: "ss-icon"}, "descend")
				), 
				React.createElement("div", {className: "phase segment"}, 
					React.createElement("a", {onClick: this.up("phase"), onTouchEnd: this.up("phase"), className: "ss-icon"}, "ascend"), 
					React.createElement("h5", null, this.phase()), 
					React.createElement("a", {onClick: this.down("phase"), onTouchEnd: this.down("phase"), className: "ss-icon"}, "descend")
				)
			)
		);
	}
});

module.exports = Clock