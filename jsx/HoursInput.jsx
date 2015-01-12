/** @jsx React.DOM */

// @todo - UNFINISHED

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
		onValueChange : React.PropTypes.func,
		value : React.PropTypes.string
	},

	// lifecycle
	getDefaultProps : function () {
		return {
			value : "Mo-Fr 9:00-17:00"
		}
	},


	// event handlers
	onToggleDay : function (e) {
		var abr = e.target.getAttribute('data-rel')
			, o = Hours.openingObject(this.props.value);
	
		o[abr] = !o[abr];

		if (typeof this.props.onValueChange === "function") {
			this.props.onValueChange(Hours.openingObjectToString(o), this.props.name);
		}
	},

	onHourChange : function (e) {
		var abr = e.target.getAttribute("ref")
			, o = Hours.openingObject(this.props.value);
	
		o[abr] = !o[abr];

		if (typeof this.props.onValueChange === "function") {
			this.props.onValueChange(Hours.openingObjectToString(o), this.props.name);
		}
		this.onChange();
	},


	// render
	renderDays : function (obj) {
		var out = []
			, dayClass;

		for (var i=0,day; day=days[i]; i++) {
			dayClass = (obj[day[0]]) ? "day selected" : "day";
			out.push(<div key={i} data-rel={day[0]} onClick={this.onToggleDay} className={dayClass}>{day[1]}</div>);
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
		var obj = Hours.openingObject(this.props.value);

		return (
			<div className="hoursInput">
				{this.renderDays(obj)}
				<Clock name="start" disabled={obj.allDay} />
				<p>-</p>
				<Clock name="stop" disabled={obj.allDay} />
				<div className="check">
					<input type="checkbox" checked={obj.allDay} />
					<label>all day</label>
				</div>
			</div>
		)
	}
});

module.exports = HoursInput;