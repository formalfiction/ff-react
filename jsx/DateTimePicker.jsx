/** @jsx React.DOM */

var iScroll = require('../deps/iscroll');

var WheelPicker = React.createClass({
	dragStart : function () {

	},
	dragStop : function () {

	},
	componentDidMount : function () {
		var options = {
			mouseWheel : true
		};
		this.dayScroll = new iScroll(this.refs.day.getDOMNode(), options);
		this.hourScroll = new iScroll(this.refs.hour.getDOMNode(), options);
		this.minuteScroll = new iScroll(this.refs.minute.getDOMNode(), options);
		this.phaseScroll = new iScroll(this.refs.phase.getDOMNode(), options);
	},
	render : function () {
		return (
			<div className="picker" onMouseDown={this.props.onMouseDown}>
				<div ref="day" className="day segment">
					<ul>
						<li>Monday. Sept. 9th</li>
						<li>Tues. Sept. 20th</li>
						<li>Wed. Sept. 21st</li>
						<li>Thur. Sept. 22nd</li>
						<li>Friday. Sept. 23rd</li>
					</ul>
				</div>
				<div ref="hour" className="hour segment">
					<ul>
						<li>10</li>
						<li>11</li>
						<li>12</li>
					</ul>
				</div>
				<div ref="minute" className="minute segment">
					<ul>
						<li>00</li>
						<li>15</li>
						<li>30</li>
					</ul>
				</div>
				<div ref="phase" className="phase segment">
					<ul>
						<li>am</li>
						<li>pm</li>
					</ul>
				</div>
			</div>
		);
	}
});

var DateTimePicker = React.createClass({
	getInitialState : function () {
		return {
			focused : false
		}
	},
	stringValue : function (value) {
		if (!value) { return ""; }
		date = this.dateValue(value);
		return months[date.getMonth()]  + " " + date.getDate() + " " + date.getFullYear();
	},
	_focus : function (e) {
		this.setState({ focused : true });
	},
	_blur : function (e) {
		this.setState({ focused : false });
	},
	_change : function (value) {
		if (typeof this.props.onChange === "function") {
			this.props.onChange({
				name : this.props.name,
				value : value
			});
		}
	},
	_inputChange : function (e) {
		this._change();
	},
	_pickerChange : function (val) {
		this._change(val);
		this.setState({ focused  : false });
	},
	// Cancel Blur event triggered by clicking the picker
	_pickerMouseDown : function (e) {
		e.preventDefault();
		$(this.refs["field"].getDOMNode()).focus();
		return false;
	},
	// Conform Various date inputs to a valid date object
	dateValue : function (value) {
		var isDate = (Object.prototype.toString.call(value) === "[object Date]");
		// Ensure Value is a valid date.
		if (!isDate) {
			if (typeof value === "number" && value != NaN) {
				value = new Date(this.props.value)
			} else {
				value = new Date()
				value = new Date(value.getFullYear(),value.getMonth(),01,0,0,0,0)
			}
		}

		return value;
	},
	render : function () {
		var value = this.props.value
			, stringValue = this.stringValue(value)
			, picker;

		if (this.state.focused) { 
			picker = <WheelPicker onMouseDown={this._pickerMouseDown} value={this.props.value} onChange={this._pickerChange} />
		}

		return (
			<div className="dateTimePicker">
				<input ref="field" type="text" onClick={this._focus} onTouchEnd={this._focus} onFocus={this._focus} onBlur={this._blur} value={stringValue} onChange={this._inputChange} />
				{picker}
			</div>
		);
	}
});

module.exports = DateTimePicker;