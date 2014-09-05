/** @jsx React.DOM */
/*
 * DateInput form field. 
 * It uses a child MonthCalendar component 
 * to handle display & selection
 * 
 */

var ReactPropTypes = require('react').PropTypes
	, MonthCalendar = require('./MonthCalendar');

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	, days = ["Mon", "Tue","Wed", "Thu", "Fri", "Sat", "Sun"];

var DatePicker = React.createClass({displayName: 'DatePicker',
	getInitialState : function () {
		return {
			focused : false
		}
	},
	stringValue : function (value) {
		if (!value) { return ""; }
		date = this.dateValue(value);
		return months[date.getMonth()]  + " " + date.getDate() + " " + date.getFullYear();
	},
	_focus : function (e) {
		this.setState({ focused : true });
	},
	_blur : function (e) {
		this.setState({ focused : false });
	},
	_change : function (value) {
		if (typeof this.props.onChange === "function") {
			this.props.onChange({
				name : this.props.name,
				value : value
			});
		}
	},
	_inputChange : function (e) {
		this._change();
	},
	_calendarChange : function (val) {
		this._change(val);
		this.setState({ focused  : false });
	},
	// Cancel Blur event triggered by clicking the calendar
	_calendarMouseDown : function (e) {
		e.preventDefault();
		$(this.refs["field"].getDOMNode()).focus();
		return false;
	},
	// Conform Various date inputs to a valid date object
	dateValue : function (value) {
		var isDate = (Object.prototype.toString.call(value) === "[object Date]");
		// Ensure Value is a valid date.
		if (!isDate) {
			if (typeof value === "number" && value != NaN) {
				value = new Date(this.props.value)
			} else {
				value = new Date()
				value = new Date(value.getFullYear(),value.getMonth(),01,0,0,0,0)
			}
		}

		return value;
	},
	render : function () {
		var calendar
			, value = this.props.value
			, stringValue = this.stringValue(value);

		if (this.state.focused) { 
			calendar = MonthCalendar( {onMouseDown:this._calendarMouseDown, value:this.props.value, onChange:this._calendarChange} )
		}
		return (
			React.DOM.div( {className:"datePicker"}, 
				React.DOM.label(null, this.props.label),
				React.DOM.input( {ref:"field", type:"text", onClick:this._focus, onTouchEnd:this._focus, onFocus:this._focus, onBlur:this._blur, value:stringValue, onChange:this._inputChange} ),
				calendar
			)
		)
	}
});

module.exports = DatePicker;