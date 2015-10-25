import React, { Component, PropTypes } from 'react';
import MonthCalendar from './MonthCalendar';

/*
 * @stateful
 * 
 * DateInput form field. 
 * It uses a child MonthCalendar component to handle display & selection
 * Uses state to track weather or not the field is focused.
 * 
 */

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const days = ["Mon", "Tue","Wed", "Thu", "Fri", "Sat", "Sun"];

class DatePicker extends Component {
	static propTypes = {
		className : PropTypes.string,
		name : PropTypes.string.isRequired,
		// Use either onChange or onValueChange, not both
		// raw change handler
		onChange : PropTypes.func,
		// change handler in the form (value, name)
		onValueChange : PropTypes.func,
		// Should be a Date object. Defaults to today.
		value : PropTypes.object,
	}
	state = {
		focused : false
	}

	// Lifecycle
	getDefaultProps() {
		const value = new Date()
		return {
			className : "datePicker",
			value : new Date(year,value.getMonth(),1,0,0,0,0)
		}
	}

	// methods
	blur = () => {
		this.setState({ focused : false });
	}
	focus = () => {
		this.setState({ focused : true });
	}
	stringValue = (date) => {
		if (!date) { return ""; }
		return months[date.getMonth()]  + " " + date.getDate() + " " + date.getFullYear();
	}
	// trigger change with a new value
	change = (value) => {
		if (typeof this.props.onChange === "function") {
			this.props.onChange(e);
		}
		if (typeof this.props.onValueChange === "function") {
			this.props.onValueChange(value, this.props.name);
		}
	}

	// handlers
	onFocus = (e) => {
		this.setState({ focused : true });
	}
	onBlur = (e) => {
		this.setState({ focused : false });
	}
	onInputChange = (e) => {
		this.change(e.target.value);
	}
	onCalendarChange = (date) => {
		this.change(date);
		// Once the User has picked a value, close the calendar
		this.setState({ focused : false });
	}
	// Cancel Blur event triggered by clicking the calendar
	onCalendarMouseDown  = (e) => {
		e.preventDefault();
		React.findDOMNode(this.refs["field"]).focus();
	}
	onCalendarTouchEnd = (e) => {
		e.stopPropagation();
	}

	// Render
	render() {
		let calendar
			, value = this.props.value
			, stringValue = this.stringValue(value);

		if (this.state.focused) { 
			calendar = <MonthCalendar 
									value={this.props.value} 
									onMouseDown={this.onCalendarMouseDown} 
									onTouchEnd={this.onCalendarTouchEnd} 
									onChange={this.onCalendarChange} />
		}

		return (
			<div className={this.props.className}>
				<input readOnly ref="field" type="text" onClick={this.onFocus} onTouchEnd={this.onFocus} onFocus={this.onFocus} onBlur={this.onBlur} value={stringValue} onChange={this.onInputChange} />
				{calendar}
			</div>
		);
	}
}

export default DatePicker;