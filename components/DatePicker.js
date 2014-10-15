/** @jsx React.DOM */
/*
 * @stateful
 * @jQuery
 * 
 * DateInput form field. 
 * It uses a child MonthCalendar component to handle display & selection
 * 
 */

var ReactPropTypes = require('react').PropTypes
	, MonthCalendar = require('./MonthCalendar');

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	, days = ["Mon", "Tue","Wed", "Thu", "Fri", "Sat", "Sun"];

var DatePicker = React.createClass({displayName: 'DatePicker',
	propTypes : {
		name : React.PropTypes.string.isRequired,
		// Use either onChange or onValueChange, not both
		// raw change handler
		onChange : React.PropTypes.func,
		// change handler in the form (value, name)
		onValueChange : React.PropTypes.func,
		value : React.PropTypes.object.isRequired,
	},

	// Component lifecycle methods
	getInitialState : function () {
		return {
			focused : false
		}
	},

	// Methods
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
	stringValue : function (value) {
		if (!value) { return ""; }
		date = this.dateValue(value);
		return months[date.getMonth()]  + " " + date.getDate() + " " + date.getFullYear();
	},

	// Event Handlers
	onFocus : function (e) {
		this.setState({ focused : true });
	},
	onBlur : function (e) {
		this.setState({ focused : false });
	},
	onChange : function (value) {

		if (typeof this.props.onChange === "function") {
			this.props.onChange(e);
		}
		if (typeof this.props.onValueChange === "function") {
			this.props.onValueChange(value, this.props.name);
		}
	},
	onInputChange : function (e) {
		this.onChange(e.target.value);
	},
	onCalendarChange : function (val) {
		this.onChange(val);
		// Once the User has picked a value, close the calendar
		this.setState({ focused : false });
	},
	// Cancel Blur event triggered by clicking the calendar
	onCalendarMouseDown : function (e) {
		e.preventDefault();
		$(this.refs["field"].getDOMNode()).focus();
		return false;
	},

	// Render
	render : function () {
		var calendar
			, value = this.props.value
			, stringValue = this.stringValue(value);

		if (this.state.focused) { 
			calendar = MonthCalendar( {value:this.props.value, onMouseDown:this.onCalendarMouseDown, onChange:this.onCalendarChange} )
		}
		return (
			React.DOM.div( {className:"datePicker"}, 
				React.DOM.input( {ref:"field", type:"text", onClick:this.onFocus, onTouchEnd:this.onFocus, onFocus:this.onFocus, onBlur:this.onBlur, value:stringValue, onChange:this.onInputChange} ),
				calendar
			)
		)
	}
});

module.exports = DatePicker;