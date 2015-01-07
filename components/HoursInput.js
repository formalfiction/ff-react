/** @jsx React.DOM */


/*
 * Input Hours of Operation
 * 
 */

var Clock = require('./Clock')
	, Hours = require('Hours')
	, days = [
		["Su","Sun."],
		["Mo","Mon."],
		["Tu","Tue."],
		["We","Wed."],
		["Th","Thu."],
		["Fr","Fri."],
		["Sa","Sat."]
	];

var HoursInput = React.createClass({displayName: 'HoursInput',
	propTypes : {
		name : React.PropTypes.string,
		onValueChange : React.PropTypes.func
	},

	// lifecycle
	getDefaultProps : function () {
		return {}
	},
	getInitialState : function () {
		return {
			Su : false,
			Mo : false,
			Tu : false,
			We : false,
			Th : false,
			Fr : false,
			Sa : false,
			allDay : true,
			startHour : 9,
			startMin : 00,
			stopHour : 17,
			stopMin : 0
		}
	},


	// methods
	value : function () {
		// @todo
		return "Mo-Fr 9:00-17:00"
	},

	// event handlers
	onToggleDay : function (e) {
		var abr = e.target.getAttribute("ref")
			, o = {};

		o[abr] = !this.state[abr];
		this.setState(o);

		this.onChange();
	},

	onHourChange : function (e) {
		
		this.onChange();
	},

	onChange : function () {
		if (typeof this.props.onValueChange === "function") {
			this.props.onValueChange(this.value(), this.props.name);
		}
	},

	// render
	dayClass : function (abr) {
		return (this.state[abr]) ? "day selected" : "day";
	},
	renderDays : function () {
		var out = [];

		for (var i=0,day; day=days[i]; i++) {
			out.push(React.createElement("div", {key: i, ref: day[0], className: this.dayClass(day[0])}, day[1]));
		}

		return (
			React.createElement("div", {className: "days"}, 
				out
			)
		);
	},
	renderHour : function (name) {

	},
	render : function () {
		return (
			React.createElement("div", {className: "hoursInput"}, 
				this.renderDays(), 
				React.createElement(Clock, {name: "start", disabled: this.state.allDay}), 
				React.createElement("p", null, "-"), 
				React.createElement(Clock, {name: "stop", disabled: this.state.allDay}), 
				React.createElement("div", {className: "check"}, 
					React.createElement("input", {type: "checkbox", checked: this.state.allDay}), 
					React.createElement("label", null, "all day")
				)
			)
		)
	}
});

module.exports = HoursInput;