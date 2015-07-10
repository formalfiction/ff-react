/** @jsx React.DOM */

var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

var repeatType = [

];

var RepeatPicker = React.createClass({
	propTypes : {
		name : React.PropTypes.string,
		value : React.PropTypes.string.isRequired,
		onValueChange : React.PropTypes.func.isRequired,
		repeatType : React.PropTypes.string
	},

	// lifecycle
	getDefaultProps : function () {
		return {
			name : "cronPicker",
			className : "cronPicker",
			value : "* 0 0 * * *",
		};
	},
	getInitialState : function () {
		return this.parse(this.props.value );
	},
	componentWillReceiveProps : function (nextProps) {
		this.setState(this.parse(nextProps.value))
	},

	// methods
	parse : function (value) {
		var parsed = {
			repeatType : "weekdays",
			weekdays : [false, false, false, false, false, false, false]
		}

		for (var i=0; i <= 7; i++) {
			parsed.weekdays[i] = this.dayOfWeekIsSelected(i, value);
		}

		return parsed;
	},
	// take a parsed object & turn it into a string
	toString : function (value) {
		value || (value = this.state)
		// parse weekdays
		var wd = "*";
		for (var i=0; i < 7; i++) {
			if (value.weekdays[i]) {
				if (wd == "*") {
					wd = i.toString();
				} else {
					wd += "," + i;
				}
			}
		}
		return "* 0 0 * * " + wd;
	},
	dayOfWeekIsSelected : function (dayInt, value) {
		var weekdays = value.split(" ");
		weekdays = weekdays[weekdays.length - 1];

		// if it's the wildcard, we're selected
		if (weekdays === "*") { return true; }
		// if the day number is contained, we're selected.
		if (~weekdays.indexOf(dayInt)) { return true; }
		// if weekdays contains a range, check to see if the
		// number is within the range
		if (~weekdays.indexOf('-')) {
			var startStop = weekdays.split("-")
				, start = +startStop[0]
				, stop = +startStop[1];
			if (dayInt > start && dayInt < stop) { return true; }
		}
		return false;
	},

	// event handlers
	onDayOfWeekCheckboxChange : function (e) {
		var name = e.target.getAttribute('name')
			, value = this.state;

		for (var i=0; i<7; i++) {
			if (days[i] == name) {
				value.weekdays[i] = e.target.checked
				break;
			}
		}

		this.props.onValueChange(this.toString(value), this.props.name);
	},

	// render 
	renderDayCheckboxes : function () {
		var els = [];
		for (var i=0,d; d=days[i]; i++) {
			els.push(
				<span key={i}>
					<label htmlFor={d}>{d}</label>
					<input name={d} type="checkbox" checked={this.state.weekdays[i]} onChange={this.onDayOfWeekCheckboxChange} />
				</span>
			);
		}
		return els;
	},
	render : function () {
		return (
			<div className={this.props.className}>
				{this.renderDayCheckboxes()}
			</div>
		);
	}
});

module.exports = RepeatPicker;