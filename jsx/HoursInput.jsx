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

var HoursInput = React.createClass({
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
			out.push(<div key={i} ref={day[0]} className={this.dayClass(day[0])}>{day[1]}</div>);
		}

		return (
			<div className="days">
				{out}
			</div>
		);
	},
	renderHour : function (name) {

	},
	render : function () {
		return (
			<div className="hoursInput">
				{this.renderDays()}
				<Clock name="start" disabled={this.state.allDay} />
				<p>-</p>
				<Clock name="stop" disabled={this.state.allDay} />
				<div className="check">
					<input type="checkbox" checked={this.state.allDay} />
					<label>all day</label>
				</div>
			</div>
		)
	}
});

module.exports = HoursInput;