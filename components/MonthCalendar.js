/** @jsx React.DOM */

/* @stateful
 * 
 * Table-Based Month Calendar intended for use as
 * small day-picker. Uses state to change the month
 * being displayed
 */

var TouchAnchor = require('./TouchAnchor');
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
	, days = { sun : 0, mon : 1, tue : 2, wed : 3, thu : 4, fri : 5, sat : 6 };


var MonthCalendar = React.createClass({displayName: 'MonthCalendar',
	propTypes : {
		name : React.PropTypes.string,
		// we accept onMouseDown & onTouchEnd Handlers
		// for use in conjunction with an input field
		// to cancel events that would blur the field.
		onMouseDown : React.PropTypes.func,
		onTouchEnd : React.PropTypes.func,
		// @todo - make this a date object
		value : React.PropTypes.object.isRequired,
		onChange : React.PropTypes.func,
		// onChange handler in the form (value, name)
		onValueChange : React.PropTypes.func
	},
	// Lifecycle
	getDefaultProps : function () {
		return {
			name : "calendar",
			value : new Date()
		}
	},
	getInitialState : function () {
		// This looks like the "don't transfer props" anti-pattern,
		// but I promise it's... not. We need to pull the month into
		// state to manipulate the month we're displaying, and we need
		// the initial month to derive from the current value.
		var displayMonth = new Date(this.props.value)
		displayMonth.setDate(1);

		return {
			// display month should always be the first
			// day of the month currently being displayed
			displayMonth : displayMonth
		}
	},

	// Methods
	monthString : function (d) {
		return months[d.getMonth()];
	},
	isValue : function (date) {
		var v = this.props.value;
		return (
			v.getFullYear() === date.getFullYear()
			&& v.getMonth() === date.getMonth() 
			&& v.getDate() === date.getDate()
		);
	},

	// Event Handlers
	onSelectDay : function (e) {
		e.preventDefault();
		var value = +e.target.getAttribute("data-value")
			, d = new Date(value);
			
		if (typeof this.props.onChange === "function") {
			this.props.onChange(d);
		} else if (typeof this.props.onValueChange === "function") {
			this.props.onValueChange(d, this.props.name);
		}
	},
	onPrevMonth : function (e) {
		var d = this.state.displayMonth;
		if (d.getMonth() > 0) {
			d.setMonth(d.getMonth() - 1);
		} else {
			d.setYear(d.getFullYear() - 1);
			d.setMonth(11);
		}
		
		this.setState({ displayMonth : d });
	},
	onNextMonth : function (e) {
		var d = this.state.displayMonth;
		if (d.getMonth() < 11) {
			d.setMonth(d.getMonth() + 1);
		} else {
			d.setYear(d.getFullYear() + 1);
			d.setMonth(0);
		}

		this.setState({ displayMonth : d });
	},

	// Render
	render : function () {
		var value = this.props.value
			, startDay = this.state.displayMonth.toString().split(' ')[0].toLowerCase()
			, offset = days[startDay]
			, weeks = []
			, week, wd, pos, c;

		// Generate Table of Dates
		for (var w=0; w < 6; w++) {
			week = [];
			for (var d=0; d < 7; d++) {
				// copy the date for manipulation
				wd = new Date(this.state.displayMonth);
				// determine grid position with i = x + (y * width)
				pos = d + ( w * 7 );
				wd.setDate(pos - offset + 1);

				c = (wd.getMonth() === this.state.displayMonth.getMonth()) ? "current" : "";
				if (this.isValue(wd)) {
					c += " selected";
				}

				// Add buttons in as <a> tags to ensure click / touch events
				// are picked up
				week.push(React.createElement("td", {
										onClick: this.onSelectDay, 
										onTouchEnd: this.onSelectDay, 
										className: c, 
										key:  d + (w * 7), 
										'data-value': wd.valueOf()
										}, wd.getDate()));
			}
			weeks.push(React.createElement("tr", {key: w}, week));
		}

		return (
			React.createElement("div", {className: "calendar cal", onMouseDown: this.props.onMouseDown, onTouchEnd: this.props.onTouchEnd}, 
				React.createElement("div", {className: "header"}, 
					React.createElement(TouchAnchor, {className: "backButton ss-icon", onClick: this.onPrevMonth, text: "previous"}), 
					React.createElement(TouchAnchor, {className: "nextButton ss-icon", onClick: this.onNextMonth, text: "next"}), 
					React.createElement("h5", {className: "month"}, this.monthString(this.state.displayMonth)), 
					React.createElement("p", {className: "year"}, this.state.displayMonth.getFullYear()), 
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