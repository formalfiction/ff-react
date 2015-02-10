/** @jsx React.DOM */

/* @stateful
 * A Picker for choosing a time range on a specific day
 */

var DatePicker = require('./DatePicker')
	, TimeWheelPicker = require('./TimeWheelPicker');

var DateTimeRangePicker = React.createClass({
	propTypes : {
		className : React.PropTypes.string,
		// name of the field
		name : React.PropTypes.string.isRequired,
		// Should be a tuple of two date objects, start time first,
		// stop time second. defaults to [new Date(), new Date()]
		value : React.PropTypes.array.isRequired,
		// onChange handler in the form (value, name)
		onValueChange : React.PropTypes.func
	},
	// Lifecycle
	getDefaultProps : function () {
		return {
			className : "dateTimeRangePicker",
			name : "DateTimeRangePicker",
			value : [new Date(), new Date()],
		}
	},
	getInitialState : function () {
		return {
			focusDate : false,
			focusStartTime : false,
			focusStopTime : false
		}
	},

	// Event Handlers
	onDatePickerValueChange : function (date, name) {
		// Only do stuff if we have a change handler
		if (typeof this.props.onValueChange === "function") {
			this.props.value[0].setYear(date.getFullYear());
			this.props.value[0].setDate(date.getMonth());
			this.props.value[0].setDate(date.getDate());

			this.props.value[1].setYear(date.getFullYear());
			this.props.value[1].setDate(date.getMonth());
			this.props.value[1].setDate(date.getDate());

			this.props.onValueChange(this.props.value, this.props.name);
		}
	},

	onTimeChange : function (value, name) {
		if (typeof this.props.onValueChange === "function") {
			if (name === "start") {
				this.props.value[0] = value;
			} else if (name === "stop") {
				this.props.value[1] = value;
			}

			this.props.onValueChange(this.props.value, this.props.name);
		}
	},

	// Render
	render : function () { 
		return (
			<div className={this.props.className}>
				<DatePicker className="date" name="date" value={this.props.value[0]} onValueChange={this.onDatePickerValueChange} />
				<TimeWheelPicker className="start" name="start" value={this.props.value[0]} onValueChange={this.onTimeChange} />
				<TimeWheelPicker className="stop" name="stop" value={this.props.value[1]} onValueChange={this.onTimeChange} />
			</div>
		);
	}
});

module.exports = DateTimeRangePicker;