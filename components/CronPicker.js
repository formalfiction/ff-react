import { Component, PropTypes } from 'react';

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const repeatType = [];

class RepeatPicker extends Component {
	static propTypes = {
		name : PropTypes.string,
		value : PropTypes.string.isRequired,
		onValueChange : PropTypes.func.isRequired,
		repeatType : PropTypes.string
	}
	static defaultProps = {
		name : "cronPicker",
		className : "cronPicker",
		value : "* 0 0 * * *",
	}

	// lifecycle
	getInitialState = () => {
		return this.parse(this.props.value);
	}
	componentWillReceiveProps = (nextProps) => {
		this.setState(this.parse(nextProps.value));
	}

	// methods
	static parse(value) {
		var parsed = {
			repeatType : "weekdays",
			weekdays : [false, false, false, false, false, false, false]
		}

		for (var i=0; i <= 7; i++) {
			parsed.weekdays[i] = this.dayOfWeekIsSelected(i, value);
		}

		return parsed;
	}
	// take a parsed object & turn it into a string
	static toString(value) {
		// parse weekdays
		let wd = "*";
		for (let i=0; i < 7; i++) {
			if (value.weekdays[i]) {
				if (wd == "*") {
					wd = i.toString();
				} else {
					wd += "," + i;
				}
			}
		}
		return "* 0 0 * * " + wd;
	}
	// check if a day of the week is selected
	static dayOfWeekIsSelected(dayInt, value) {
		let weekdays = value.split(" ");
		weekdays = weekdays[weekdays.length - 1];

		// if it's the wildcard, we're selected
		if (weekdays === "*") { return true; }
		// if the day number is contained, we're selected.
		if (~weekdays.indexOf(dayInt)) { return true; }
		// if weekdays contains a range, check to see if the
		// number is within the range
		if (~weekdays.indexOf('-')) {
			let startStop = weekdays.split("-")
				, start = +startStop[0]
				, stop = +startStop[1];
			if (dayInt > start && dayInt < stop) { return true; }
		}
		return false;
	}

	// handlers
	onDayOfWeekCheckboxChange = (e) => {
		var name = e.target.getAttribute('name')
			, value = this.state;

		for (var i=0; i<7; i++) {
			if (days[i] == name) {
				value.weekdays[i] = e.target.checked
				break;
			}
		}

		this.props.onValueChange(this.toString(value), this.props.name);
	}

	// render 
	render() {
		return (
			<div className={this.props.className}>
			{days.map((d, i) => {
				return (
					<span key={i}>
						<label htmlFor={d}>{d}</label>
						<input name={d} type="checkbox" checked={this.state.weekdays[i]} onChange={this.onDayOfWeekCheckboxChange} />
					</span>
				)
			})}
			</div>
		);
	}
});

export default RepeatPicker;