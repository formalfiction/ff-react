import { Component, PropTypes } from 'react';
import DatePicker from './DatePicker');
import TimeWheelPicker from './TimeWheelPicker');

/* children are @stateful
 * A Picker for choosing a time range on a specific day
 */

class DateTimeRangePicker extends Component{
	static propTypes = {
		disabled : PropTypes.bool,
		className : PropTypes.string,
		// name of the field
		name : PropTypes.string.isRequired,
		// a tuple of two date objects, start time first,
		// stop time second. defaults to [new Date(), new Date()]
		value : PropTypes.array.isRequired,
		// onChange handler in the form (value, name)
		onValueChange : PropTypes.func
	}
	static defaultProps = {
		className : "dateTimeRangePicker",
		name : "DateTimeRangePicker",
		value : [new Date(), new Date()],
		disabled : false
	}

	// handlers
	onDatePickerValueChange = (date, name) => {
		let value = this.props.value;
		// Only do stuff if we have a change handler
		if (typeof this.props.onValueChange === "function") {
			props.value[0].setYear(date.getFullYear());
			props.value[0].setMonth(date.getMonth());
			props.value[0].setDate(date.getDate());

			props.value[1].setYear(date.getFullYear());
			props.value[1].setMonth(date.getMonth());
			props.value[1].setDate(date.getDate());

			this.props.onValueChange(value, this.props.name);
		}
	}
	onTimeChange = (value, name) => {
		if (typeof this.props.onValueChange === "function") {
			if (name === "start") {
				this.props.value[0] = value;
			} else if (name === "stop") {
				this.props.value[1] = value;
			}

			this.props.onValueChange(this.props.value, this.props.name);
		}
	}

	// Render
	render() { 
		return (
			<div className={this.props.className}>
				<DatePicker className="date datePicker" name="date" value={this.props.value[0]} disabled={this.props.disabled} onValueChange={this.onDatePickerValueChange} />
				<TimeWheelPicker className="start timeWheelPicker" name="start" value={this.props.value[0]} disabled={this.props.disabled} onValueChange={this.onTimeChange} />
				<TimeWheelPicker className="stop timeWheelPicker" name="stop" value={this.props.value[1]} disabled={this.props.disabled} onValueChange={this.onTimeChange} />
			</div>
		);
	}
}

export default DateTimeRangePicker;