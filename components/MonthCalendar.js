/** @jsx React.DOM */

/* @stateful
 * 
 * Table-Based Month Calendar intended for use as
 * small day-picker
 */

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
	, days = { sun : 0, mon : 1, tue : 2, wed : 3, thu : 4, fri : 5, sat : 6 };

var MonthCalendar = React.createClass({displayName: "MonthCalendar",
	propTypes : {
		onMouseDown : React.PropTypes.func,
		onTouchEnd : React.PropTypes.func,
		// @todo - make this a date object
		value : React.PropTypes.object.isRequired,
	},

	// Component lifecycle methods
	getInitialState : function () {
		return {
			value : this.dateValue(this.props.value)
		};
	},

	// Methods
	// Conform Various date inputs to a valid date object
	dateValue : function (value) {
		var isDate = (Object.prototype.toString.call(value) === "[object Date]");
		// Ensure Value is a valid date.
		if (!isDate) {
			if (typeof value === "number" && value != NaN) {
				value = new Date(value)
			} else {
				value = new Date()
				value = new Date(value.getFullYear(),value.getMonth(),01,0,0,0,0)
			}
		}

		return value;
	},
	_monthString : function (d) {
		return months[d.getMonth()];
	},
	_yearString : function (d) {
		return d.getFullYear().toString();
	},
	_isCurrentMonth : function (week, day) {
		var date = day + (week * 7)
			, lastDay = new Date(this.state.value.getFullYear(), this.state.value.getDate(), 0).getDate();
		return (date > this.state.offset && date < lastDay);
	},
	_isCurrentDate : function (week, day) {
		var date = day + (week * 7)
		return (this.state.value.getDate() === date );
	},

	// Event Handlers
	onChange : function (date) {
		if (typeof this.props.onChange === "function") {
			this.props.onChange(date);
		}
	},
	onSelectDay : function (e) {
		e.preventDefault();
		var el = $(e.target)
			, day = el.data('day')
			, month = el.data('month')
			, d = this.state.value;

		d.setMonth(month);
		d.setDate(day);

		this.onChange(d);
		this.setState({ value : d });
	},
	onPrevMonth : function (e) {
		var d = this.state.value;
		if (d.getMonth() > 0) {
			d.setMonth(d.getMonth() - 1);
		} else {
			d.setFullYear(d.getFullYear() - 1);
			d.setMonth(11);
		}
		
		this.setState({ value : d });
	},
	onNextMonth : function (e) {
		var d = this.state.value;
		if (d.getMonth() < 11) {
			d.setMonth(d.getMonth() + 1);
		} else {
			d.setFullYear(d.getFullYear() + 1);
			d.setMonth(0);
		}

		this.setState({ value : d });
	},

	// Render
	render : function () {
		var value = this.state.value
			, firstDay = new Date(this.state.value);

		firstDay.setDate(1)

		var startDay = firstDay.toString().split(' ')[0].toLowerCase()
			, offset = days[startDay]
			, weeks = []
			, week, wd, pos, c, date;

		// Generate Table of Dates
		for (var w=0; w < 6; w++) {
			week = [];
			for (var d=0; d < 7; d++) {
				// copy the date for manipulation
				wd = new Date(this.state.value);
				// determine grid position with i = x + (y * width)
				pos = d + ( w * 7 );
				wd.setDate(pos - offset + 1);
				date = wd.getDate();
				c = (wd.getMonth() === value.getMonth()) ? "current" : "";

				// Add buttons in as <a> tags to ensure click / touch events
				// are picked up
				week.push(React.createElement("td", {
										onClick: this.onSelectDay, 
										onTouchEnd: this.onSelectDay, 
										className: c, key:  d + (w * 7), 
										"data-month": wd.getMonth(), 
										"data-day": date}, date));
			}
			weeks.push(React.createElement("tr", {key: w}, week));
		}

		return (
			React.createElement("div", {className: "calendar cal", onMouseDown: this.props.onMouseDown, onTouchEnd: this.props.onTouchEnd}, 
				React.createElement("div", {className: "header"}, 
					React.createElement("a", {className: "backButton ss-icon", onClick: this.onPrevMonth, onTouchEnd: this.onPrevMonth}, "previous"), 
					React.createElement("a", {className: "nextButton ss-icon", onClick: this.onNextMonth, onTouchEnd: this.onNextMonth}, "next"), 
					React.createElement("h5", {className: "month"}, this._monthString(value)), 
					React.createElement("p", {className: "year"}, this._yearString(value)), 
					React.createElement("hr", null)
				), 
				React.createElement("table", {className: "dates"}, 
					React.createElement("thead", null, 
						React.createElement("tr", null, 
							React.createElement("th", null, "S"), React.createElement("th", null, "M"), React.createElement("th", null, "T"), React.createElement("th", null, "W"), React.createElement("th", null, "T"), React.createElement("th", null, "F"), React.createElement("th", null, "S")
						)
					), 
					weeks
				)
			)
		);
	}
});

module.exports = MonthCalendar;