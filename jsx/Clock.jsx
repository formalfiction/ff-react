/*
 * Clock is used for selecting time values in 15-minute
 * increments. Often used in conjunction with TimePicker.
 *
 * @todo - one day should support arbitrary minute increments
 * 
 * @jsx React.DOM
 */


var Clock = React.createClass({
	hours : ["01","02","03","04","05","06","07","08","09","10","11","12"],
	minutes : ["00","15","30","45"],
	phase : ["am","pm"],
	// Break a date value up into the needed hours / minutes / phase
	// pieces
	_values : function (val) {
		// if no initial value return 9:00am
		if (!val) {
			return {
				hours : 8,
				minutes : 0,
				phase : 0
			}
		}
		
		if (typeof val === "number" && val !== NaN) {
			val = new Date(val)
		} else {
			val = new Date()
		}

		var h = val.getHours()
			, ph = (h <= 12) ? 0 : 1;

		// if we're in the aft, minus 12 to de-militarize time
		if (ph === 1) {
			h = h - 12;
		}

		return {
			hours : (h === 0) ? h : h - 1,
			minutes : (15 * Math.round(val.getMinutes() / 15)) / 15,
			phase : ph
		}

	},
	// restore hours / minutes / phase to a date value.
	// returns a numerical js date.
	_timeValue : function (values) {
		var h = (values.phase === 0) ? values.hours : values.hours + 12
			, m = values.minutes
			, d = this.props.value;

		// ensure we have a date to work with.
		if (typeof d === "number" && d !== NaN) {
			d = new Date(d)
		} else {
			d = new Date()
		}

		// Add 1 to hours to un-array-index
		d.setHours(h + 1);
		// Multiply minutes by 15 as we work in 15 minute increments
		d.setMinutes(m * 15);

		return d.valueOf();
	},
	// return a up-incrementer
	up : function (unit) {
		var self = this;
		return function (e) {
			e.preventDefault();
			var values = self._values(self.props.value);
			// if (values[unit] < self[unit].length - 1) {
				values[unit] = values[unit] + 1;
				self._change.call(self, values);
			// }
			return false;
		}
	},
	// return an down-incrementer
	down : function (unit) {
		var self = this;
		return function(e) {
			e.preventDefault();
			var values = self._values(self.props.value);
			// if (values[unit] > 0) {
				values[unit] = values[unit] - 1;
				self._change.call(self, values);
			// }
			return false;
		}
	},
	_change : function (values) {
		if (typeof this.props.onChange === "function") {
			this.props.onChange(this._timeValue(values));
		}
	},
	render : function () {
		var values = this._values(this.props.value);
		return (
			<div className="clock" onMouseDown={this.props.onMouseDown}>
				<div className="hours segment">
					<a onClick={this.up("hours")} onTouchEnd={this.up("hours")} className="ss-icon">up</a>
					<h5>{this.hours[values.hours]}</h5>
					<a onClick={this.down("hours")} onTouchEnd={this.down("hours")} className="ss-icon">down</a>
				</div>
				<h5 className="separator segment">:</h5>
				<div className="minutes segment">
					<a onClick={this.up("minutes")} onTouchEnd={this.up("minutes")} className="ss-icon">up</a>
					<h5>{this.minutes[values.minutes]}</h5>
					<a onClick={this.down("minutes")} onTouchEnd={this.down("minutes")} className="ss-icon">down</a>
				</div>
				<div className="phase segment">
					<a onClick={this.up("phase")} onTouchEnd={this.up("phase")} className="ss-icon">up</a>
					<h5>{this.phase[values.phase]}</h5>
					<a onClick={this.down("phase")} onTouchEnd={this.down("phase")} className="ss-icon">down</a>
				</div>
			</div>
		);
	}
});

module.exports = Clock