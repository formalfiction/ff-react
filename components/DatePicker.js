/** @jsx React.DOM */
/*
 * @stateful
 * 
 * DateInput form field. 
 * It uses a child MonthCalendar component to handle display & selection
 * Uses state to track weather or not the field is focused.
 * 
 */

var ReactPropTypes = require('react').PropTypes
	, MonthCalendar = require('./MonthCalendar');

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	, days = ["Mon", "Tue","Wed", "Thu", "Fri", "Sat", "Sun"];


var DatePicker = React.createClass({displayName: "DatePicker",
	propTypes : {
		name : React.PropTypes.string.isRequired,
		// Use either onChange or onValueChange, not both
		// raw change handler
		onChange : React.PropTypes.func,
		// change handler in the form (value, name)
		onValueChange : React.PropTypes.func,
		// Should be a Date object. Defaults to today.
		value : React.PropTypes.object,
	},

	// Lifecycle
	getInitialState : function () {
		return {
			focused : false
		}
	},
	getDefaultProps : function () {
		var value = new Date()
				value = new Date(value.getFullYear(),value.getMonth(),01,0,0,0,0)
		return {
			value : value
		}
	},

	// Methods
	blur : function () {
		this.setState({ focused : false });
	},
	focus : function () {
		this.setState({ focused : true });
	},
	stringValue : function (date) {
		if (!date) { return ""; }
		return months[date.getMonth()]  + " " + date.getDate() + " " + date.getFullYear();
	},
	// trigger change with a new value
	change : function (value) {
		if (typeof this.props.onChange === "function") {
			this.props.onChange(e);
		}
		if (typeof this.props.onValueChange === "function") {
			this.props.onValueChange(value, this.props.name);
		}
	},


	// Event Handlers
	onFocus : function (e) {
		this.setState({ focused : true });
	},
	onBlur : function (e) {
		this.setState({ focused : false });
	},
	onInputChange : function (e) {
		this.change(e.target.value);
	},
	onCalendarChange : function (date) {
		this.change(date);
		// Once the User has picked a value, close the calendar
		this.setState({ focused : false });
	},
	// Cancel Blur event triggered by clicking the calendar
	onCalendarMouseDown : function (e) {
		e.preventDefault();
		$(this.refs["field"].getDOMNode()).focus();
	},
	onCalendarTouchEnd : function (e) {
		e.stopPropagation();
	},

	// Render
	render : function () {
		var calendar
			, value = this.props.value
			, stringValue = this.stringValue(value);

		if (this.state.focused) { 
			calendar = React.createElement(MonthCalendar, {
									value: this.props.value, 
									onMouseDown: this.onCalendarMouseDown, 
									onTouchEnd: this.onCalendarTouchEnd, 
									onChange: this.onCalendarChange})
		}

		return (
			React.createElement("div", {className: "datePicker"}, 
				React.createElement("input", {readOnly: true, ref: "field", type: "text", onClick: this.onFocus, onTouchEnd: this.onFocus, onFocus: this.onFocus, onBlur: this.onBlur, value: stringValue, onChange: this.onInputChange}), 
				calendar
			)
		);
	}
});

module.exports = DatePicker;