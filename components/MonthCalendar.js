/** @jsx React.DOM */

/* @stateful
 * 
 * Table-Based Month Calendar intended for use as
 * small day-picker
 */

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
	, days = { mon : -1 , tue : 0, wed : 1, thu : 2, fri : 3, sat : 4, sun : 5 };

var MonthCalendar = React.createClass({displayName: 'MonthCalendar',
	propTypes : {
		onMouseDown : React.PropTypes.func.isRequired,
		// @todo - make this a date object
		value : React.PropTypes.number.isRequired,
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
			this.props.onChange(date.valueOf());
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
		return false;
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
			, startDay = value.toString().split(' ')[0].toLowerCase()
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
				wd.setDate(pos - offset);
				date = wd.getDate();
				c = (wd.getMonth() === value.getMonth()) ? "current" : "";

				// Add buttons in as <a> tags to ensure click / touch events
				// are picked up
				week.push(React.DOM.td(
										{onClick:this.onSelectDay,
										onTouchEnd:this.onSelectDay,
										className:c, key: d + (w * 7), 
										'data-month':wd.getMonth(), 
										'data-day':date}, date));
			}
			weeks.push(React.DOM.tr( {key:w}, week));
		}

		return (
			React.DOM.div( {className:"calendar cal", onMouseDown:this.props.onMouseDown}, 
				React.DOM.div( {className:"header"}, 
					React.DOM.a( {className:"backButton ss-icon", onClick:this.onPrevMonth, onTouchEnd:this.onPrevMonth}, "previous"),
					React.DOM.a( {className:"nextButton ss-icon", onClick:this.onNextMonth, onTouchEnd:this.onNextMonth}, "next"),
					React.DOM.h5( {className:"month"}, this._monthString(value)),
					React.DOM.p( {className:"year"}, this._yearString(value)),
					React.DOM.hr(null )
				),
				React.DOM.table( {className:"dates"}, 
					React.DOM.thead(null, 
						React.DOM.tr(null, 
							React.DOM.th(null, "M"),React.DOM.th(null, "T"),React.DOM.th(null, "W"),React.DOM.th(null, "T"),React.DOM.th(null, "F"),React.DOM.th(null, "S"),React.DOM.th(null, "S")
						)
					),
					weeks
				)
			)
		);
	}
});

module.exports = MonthCalendar;