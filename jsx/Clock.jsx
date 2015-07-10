/** @jsx React.DOM */
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

var Clock = React.createClass({
	propTypes : {
		name : React.PropTypes.string,
		onValueChange : React.PropTypes.func,
		disabled : React.PropTypes.bool,
		// must be a valid date object
		value : React.PropTypes.object.isRequired
	},

	// Methods
	// Break a date value up into the needed hours / minutes / phase
	// pieces
	// _values : function (val) {
	// 	// if no initial value return 9:00am
	// 	if (!val) {
	// 		return {
	// 			hours : 8,
	// 			minutes : 0,
	// 			phase : 0
	// 		}
	// 	}

	// 	var h = val.getHours()
	// 		, ph = (h < 12) ? 0 : 1;

	// 	// if we're in the aft, minus 12 to de-militarize time
	// 	if (ph === 1) {
	// 		h = h - 12;
	// 	}

	// 	return {
	// 		hours : (h === 0) ? 11 : h - 1,
	// 		minutes : (15 * Math.round(val.getMinutes() / 15)) / 15,
	// 		phase : ph
	// 	}

	// },
	// // restore hours / minutes / phase to a date value.
	// // returns a numerical js date.
	// _timeValue : function (values) {
	// 	var h = (values.phase === 0) ? values.hours : values.hours + 12
	// 		, m = values.minutes
	// 		, d = this.props.value;

	// 	// Add 1 to hours to un-array-index
	// 	d.setHours(h + 1);
	// 	// Multiply minutes by 15 as we work in 15 minute increments
	// 	d.setMinutes(m * 15);

	// 	return d;
	// },



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
			<div className="clock" onMouseDown={this.props.onMouseDown}>
				<div className="hours segment">
					<a onClick={this.up("hours")} onTouchEnd={this.up("hours")} className="ss-icon">ascend</a>
					<h5>{this.hours()}</h5>
					<a onClick={this.down("hours")} onTouchEnd={this.down("hours")} className="ss-icon">descend</a>
				</div>
				<h5 className="separator segment">:</h5>
				<div className="minutes segment">
					<a onClick={this.up("minutes")} onTouchEnd={this.up("minutes")} className="ss-icon">ascend</a>
					<h5>{this.minutes()}</h5>
					<a onClick={this.down("minutes")} onTouchEnd={this.down("minutes")} className="ss-icon">descend</a>
				</div>
				<div className="phase segment">
					<a onClick={this.up("phase")} onTouchEnd={this.up("phase")} className="ss-icon">ascend</a>
					<h5>{this.phase()}</h5>
					<a onClick={this.down("phase")} onTouchEnd={this.down("phase")} className="ss-icon">descend</a>
				</div>
			</div>
		);
	}
});

module.exports = Clock