import React, { Component, PropTypes } from 'react';
import TimeWheelPicker from './TimeWheelPicker';
import Time from '../utils/time';

class TimeSpanInput extends Component {
	static propTypes = {
		name : PropTypes.string,
		// must be a tuple of two date objects:
		// [statDate, endDate]
		value : PropTypes.array.isRequired,
		onChange : PropTypes.func,
		onValueChange : PropTypes.func,
	}
	static defaultProps = {
		name : "timeSpanPicker",
		interval : 15,
		value : [new Date(), new Date()],
	}

	// Methods
	roundDate = (date) => {
		if (this.props.interval > 60 && this.props.interval !== 0) {
			// Hour only
			date.setMinutes(0);
		} else {
			// Everything else
			date.setMinutes(this.props.interval * Math.round(date.getMinutes() / this.props.interval));
		}

		date.setSeconds(0);
		date.setMilliseconds(0);

		return date;
	}

	// Event Handlers
	onValueChange = (value, name) => {
		if (name === "start") {
			// always deliver round dates.
			var end = this.roundDate(this.props.value[1]);

			if (end.valueOf() < value.valueOf()) {
				end = new Date(value);
			}
			this.props.onValueChange([value, end], this.props.name);
		} else if (name === "end") {
			// always deliver round dates.
			var start = this.roundDate(this.props.value[0]);

			if (start.valueOf() > value.valueOf()) {
				start = value;
			}

			this.props.onValueChange([start, value], this.props.name);
		}
	}

	// Render
	render() {
		return (
			<div className="timeSpanInput">
				<TimeWheelPicker className="start picker" name="start" value={this.props.value[0]} mustBefore={this.props.value[1]}  interval={this.props.interval} onValueChange={this.onValueChange} />
				<p className="divider">-</p>
				<TimeWheelPicker className="end picker" name="end" value={this.props.value[1]} mustAfter={this.props.value[0]} interval={this.props.interval} onValueChange={this.onValueChange} />
			</div>
		);
	}
}

export default TimeSpanInput;