/** @jsx React.DOM */
var React = require('React');

var Time = require('../utils/time')
	, TimeWheelPicker = require('./TimeWheelPicker')

var TimeSpanInput = React.createClass({displayName: "TimeSpanInput",
	propTypes : {
		name : React.PropTypes.string,
		// must be a tuple of two date objects:
		// [statDate, endDate]
		value : React.PropTypes.array.isRequired,
		onChange : React.PropTypes.func,
		onValueChange : React.PropTypes.func,
	},

	// Lifecycle
	getDefaultProps : function () {
		return {
			name : "timeSpanPicker",
			interval : 15,
			value : [new Date(), new Date()],
		}
	},

	// Methods
	roundDate : function (date){
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
	},

	// Event Handlers
	onValueChange : function (value, name) {
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
	},

	// Render
	render : function () {
		return (
			React.createElement("div", {className: "timeSpanInput"}, 
				React.createElement(TimeWheelPicker, {className: "start picker", name: "start", value: this.props.value[0], mustBefore: this.props.value[1], interval: this.props.interval, onValueChange: this.onValueChange}), 
				React.createElement("p", {className: "divider"}, "-"), 
				React.createElement(TimeWheelPicker, {className: "end picker", name: "end", value: this.props.value[1], mustAfter: this.props.value[0], interval: this.props.interval, onValueChange: this.onValueChange})
			)
		);
	}
});

module.exports = TimeSpanInput;