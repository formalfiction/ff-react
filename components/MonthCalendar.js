import React, { Component, PropTypes } from 'react';
import TouchAnchor from './TouchAnchor';

/* @stateful
 * 
 * Table-Based Month Calendar intended for use as
 * small day-picker. Uses state to change the month
 * being displayed
 */
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
	, days = { sun : 0, mon : 1, tue : 2, wed : 3, thu : 4, fri : 5, sat : 6 };


class MonthCalendar extends Component {
	static propTypes = {
		name : PropTypes.string,
		// we accept onMouseDown & onTouchEnd Handlers
		// for use in conjunction with an input field
		// to cancel events that would blur the field.
		onMouseDown : PropTypes.func,
		onTouchEnd : PropTypes.func,
		// @todo - make this a date object
		value : PropTypes.object.isRequired,
		onChange : PropTypes.func,
		// onChange handler in the form (value, name)
		onValueChange : PropTypes.func
	}
	static defaultProps = {
		name : "calendar",
		value : new Date()
	}
	state = {
		displayMonth : new Date()
	}

	// lifecycle
	componentDidMount = () => {
		let d = new Date(this.props.value);
		d.setDate(1);
		this.setState({ displayMonth : d });
	}

	// methods
	monthString = (d) => {
		return months[d.getMonth()];
	}

	isValue = (date) => {
		var v = this.props.value;
		return (
			v.getFullYear() === date.getFullYear()
			&& v.getMonth() === date.getMonth() 
			&& v.getDate() === date.getDate()
		);
	}

	// handlers
	onSelectDay = (e) => {
		e.preventDefault();
		var value = +e.target.getAttribute("data-value")
			, d = new Date(value);
			
		if (typeof this.props.onChange === "function") {
			this.props.onChange(d);
		} else if (typeof this.props.onValueChange === "function") {
			this.props.onValueChange(d, this.props.name);
		}
	}
	onPrevMonth = (e) => {
		var d = this.state.displayMonth;
		if (d.getMonth() > 0) {
			d.setMonth(d.getMonth() - 1);
		} else {
			d.setYear(d.getFullYear() - 1);
			d.setMonth(11);
		}
		
		this.setState({ displayMonth : d });
	}
	onNextMonth = (e) => {
		var d = this.state.displayMonth;
		if (d.getMonth() < 11) {
			d.setMonth(d.getMonth() + 1);
		} else {
			d.setYear(d.getFullYear() + 1);
			d.setMonth(0);
		}

		this.setState({ displayMonth : d });
	}

	// Render
	render() {
		const { value } = this.props;
		const { displayMonth } = this.state;

		let startDay = displayMonth.toString().split(' ')[0].toLowerCase()
			, offset = days[startDay]
			, weeks = []
			, week, wd, pos, c;


		// Generate Table of Dates
		for (var w=0; w < 6; w++) {
			week = [];
			for (var d=0; d < 7; d++) {
				// copy the date for manipulation
				wd = new Date(displayMonth);
				// determine grid position with i = x + (y * width)
				pos = d + ( w * 7 );
				wd.setDate(pos - offset + 1);

				c = (wd.getMonth() === displayMonth.getMonth()) ? "current" : "";
				if (this.isValue(wd)) {
					c += " selected";
				}

				// Add buttons in as <a> tags to ensure click / touch events
				// are picked up
				week.push(<td
										onClick={this.onSelectDay}
										onTouchEnd={this.onSelectDay}
										className={c} 
										key={ d + (w * 7) }
										data-value={wd.valueOf()}
										>{wd.getDate()}</td>);
			}
			weeks.push(<tr key={w}>{week}</tr>);
		}

		return (
			<div className="calendar cal" onMouseDown={this.props.onMouseDown} onTouchEnd={this.props.onTouchEnd}>
				<div className="header">
					<TouchAnchor className="backButton ss-icon" onClick={this.onPrevMonth} text="previous" />
					<TouchAnchor className="nextButton ss-icon" onClick={this.onNextMonth} text="next" />
					<h5 className="month">{this.monthString(displayMonth)}</h5>
					<p className="year">{displayMonth.getFullYear()}</p>
					<hr />
				</div>
				<table className="dates">
					<thead>
						<tr>
							<th>S</th><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th>
						</tr>
					</thead>
					<tbody>{weeks}</tbody>
				</table>
			</div>
		);
	}
}

export default MonthCalendar;