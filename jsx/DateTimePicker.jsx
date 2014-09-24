/** @jsx React.DOM */

var iScroll = require('../deps/iscroll');

var months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']
	, days = { mon : -1 , tue : 0, wed : 1, thu : 2, fri : 3, sat : 4, sun : 5 };

var WheelPicker = React.createClass({
	segments : ['day','hour','minute','phase'],
	componentDidMount : function () {
		var self = this
			, options = {
					mouseWheel : true,
					snap : 'li'
				};

		this.segments.forEach(function(segment){
			var name = segment + 'Scroll';
			self[name] = new iScroll(self.refs[segment].getDOMNode(), options);
			self[name].on('scrollEnd', self.scrollEnder(segment));
			if (segment === "day") {
				self[name].scrollToElement(self[name].scroller.children[self.daysBack],0);
			}
		});
	},
	scrollEnder : function (segment) {
		var self = this;
		return function () {
			// add one to choose the middle of three displayed elements
			var i = this.currentPage.pageY + 1
				// , text = this.scroller.children[i].textContent
				, scrollValue = this.scroller.children[i].getAttribute('data-value')
				, oldValue = self.props.value
				, value = new Date(self.props.value);

			switch (segment) {
				case "day":
					value.setDate(scrollValue);
					break;
				case "hour":
					value.setHours(scrollValue);
					break;
				case "minute":
					value.setMinutes(scrollValue);
					break;
				case "phase":
					break;
			}

			if (oldValue != value) {
				if (typeof self.props.onChange === "function") {
					self.props.onChange(value);
				}
			}
		}
	},
	daysBack : 14,
	daysForward : 14,
	day : function (value, key) {
		return <li data-value={value.getDate()} key={key}>{this.stringValue(value)}</li>
	},
	days : function (value) {
		var days = []
			, i = 0
			, v = new Date(value);

		v.setDate(v.getDate() - this.daysBack);
		for (var j=0; j < this.daysBack; j++) {
			v.setDate(v.getDate() + 1);
			days.push(this.day(v,i));
			i++;
		}

		for (j=0; j < this.daysForward; j++) {
			v.setDate(v.getDate() + 1);
			days.push(this.day(v, i));
			i++;
		}
		return days;
	},
	dateValue : function (value) {
		var isDate = (Object.prototype.toString.call(value) === "[object Date]");
		// Ensure Value is a valid date.
		if (!isDate) {
			if (typeof value === "number" && value != NaN) {
				value = new Date(this.props.value)
			} else {
				var now = new Date()
				value = new Date(now.getFullYear(),now.getMonth(),now.getDate(),0,0,0,0)
			}
		}

		return value;
	},
	stringValue : function (value) {
		if (!value) { return ""; }
		date = this.dateValue(value);
		return months[date.getMonth()]  + " " + date.getDate() + " " + date.getFullYear();
	},
	render : function () {
		var value = this.props.value
			, days = this.days(value);
		return (
			<div className="picker" onMouseDown={this.props.onMouseDown}>
				<div ref="day" className="day segment">
					<ul>
						<li></li>
						<li></li>
						{days}
					</ul>
				</div>
				<div ref="hour" className="hour segment">
					<ul>
						<li></li>
						<li></li>
						<li>1</li>
						<li>2</li>
						<li>3</li>
						<li>4</li>
						<li>5</li>
						<li>6</li>
						<li>7</li>
						<li>8</li>
						<li>9</li>
						<li>10</li>
						<li>11</li>
						<li>12</li>
					</ul>
				</div>
				<div ref="minute" className="minute segment">
					<ul>
						<li></li>
						<li></li>
						<li>00</li>
						<li>15</li>
						<li>30</li>
						<li>45</li>
					</ul>
				</div>
				<div ref="phase" className="phase segment">
					<ul>
						<li></li>
						<li></li>
						<li>am</li>
						<li>pm</li>
						<li></li>
						<li></li>
					</ul>
				</div>
			</div>
		);
	}
});

var DateTimePicker = React.createClass({
	getInitialState : function () {
		return {
			focused : false,
			value : this.dateValue(this.props.value)
		}
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
				var now = new Date()
				value = new Date(now.getFullYear(),now.getMonth(),now.getDate(),0,0,0,0)
			}
		}

		return value;
	},
	stringValue : function (value) {
		if (!value) { return ""; }
		date = this.dateValue(value);
		return months[date.getMonth()]  + " " + date.getDate() + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
	},
	render : function () {
		console.log(this.props.value);
		var value = this.dateValue(this.props.value)
			, stringValue = this.stringValue(value)
			, picker;

		if (this.state.focused) { 
			picker = <WheelPicker onMouseDown={this._pickerMouseDown} value={value} onChange={this._pickerChange} />
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