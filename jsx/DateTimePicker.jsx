/** @jsx React.DOM */

var iScroll = require('../deps/iscroll');

var months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']
	, days = { mon : -1 , tue : 0, wed : 1, thu : 2, fri : 3, sat : 4, sun : 5 }
	, hours = [1,2,3,4,5,6,7,8,9,10,11,12]
	, minutes = [0,15,30,45]
	, now = new Date();

var WheelPicker = React.createClass({
	segments : ['day','hour','minute','phase'],

	// Component Lifecycle
	componentDidMount : function () {
		var self = this
			, options = {
					mouseWheel : true,
					snap : 'li',
					snapThreshold : 3
				};

		this.segments.forEach(function(segment){
			var name = segment + 'Scroll';
			self[name] = new iScroll(self.refs[segment].getDOMNode(), options);
			self[name].on('scrollEnd', self.scrollEnder(segment));
		});

		this.refreshScrollers();
		this.scrollToDate(now);
	},

	// Methods
	scrollToDate : function (date) {
		var hours = date.getHours()
			, daysBack = this.daysBack
			, minutes = Math.round(date.getMinutes() / 15)
			, pm = (hours > 11);

		if (pm) { hours = hours - 12; }

		daysBack = (daysBack > 0) ? daysBack - 1 : daysBack;
		hours = (hours > 0) ? hours - 1 : hours;
		minutes = (minutes > 0) ? minutes - 1 : minutes;

		this.dayScroll.scrollToElement(this.dayScroll.scroller.children[daysBack],0);
		this.setSelected(this.dayScroll, daysBack + 2);
		this.hourScroll.scrollToElement(this.hourScroll.scroller.children[hours],0);
		this.setSelected(this.hourScroll, hours + 2);
		this.minuteScroll.scrollToElement(this.minuteScroll.scroller.children[minutes],0);
		this.setSelected(this.minuteScroll, minutes + 2);
		this.phaseScroll.scrollToElement(this.phaseScroll.scroller.children[pm ? 3 : 2],0);
		this.setSelected(this.phaseScroll, pm ? 3 : 2);
	},
	refreshScrollers : function () {
		this.dayScroll.refresh();
		this.hourScroll.refresh();
		this.minuteScroll.refresh();
		this.phaseScroll.refresh();
	},
	setSelected : function (iscroll, sel) {
		for (var i=0; i < iscroll.scroller.children.length; i++){
			iscroll.scroller.children[i].className = (sel == i) ? "selected" : "";
		}
	},
	scrollEnder : function (segment) {
		var self = this;
		return function () {
			// add one to choose the second displayed element (hopefully in the middle)
			var i = this.currentPage.pageY + 2
				, scrollValue = +this.scroller.children[i].getAttribute('data-value')
				, oldValue = self.props.value
				, value = new Date(self.props.value);

			self.setSelected(this, i);

			switch (segment) {
				case "day":
					year = +this.scroller.children[i].getAttribute('data-year');
					month = +this.scroller.children[i].getAttribute('data-month');
					value.setFullYear(year);
					value.setMonth(month);
					value.setDate(scrollValue);
					break;
				case "hour":
					value.setHours(scrollValue);
					break;
				case "minute":
					value.setMinutes(scrollValue);
					break;
				case "phase":
					if (scrollValue === 0 && value.getHours() > 12) {
						value.setHours(value.getHours() - 12);
					} else if (scrollValue === 1 && value.getHours() < 12) {
						value.setHours(value.getHours() + 12);
					}
					break;
			}

			if (oldValue != value) {
				if (typeof self.props.onChange === "function") {
					self.props.onChange(value, self.props.name);
				}
			}
		}
	},
	daysBack : 14,
	daysForward : 14,

	// Render Methods
	day : function (date, key) {
		return (
			<li 
			data-year={date.getFullYear()} 
			data-month={date.getMonth()} 
			data-value={date.getDate()} 
			key={key}>
				{this.stringValue(date)}
		</li>
		);
	},
	days : function (value) {
		var days = []
			, i = 0
			, v = new Date(now);

		v.setDate(v.getDate() - this.daysBack);
		for (var j=0; j < this.daysBack; j++) {
			v.setDate(v.getDate() + 1);
			days.push(this.day(v, i));
			i++;
		}

		for (j=0; j < this.daysForward; j++) {
			v.setDate(v.getDate() + 1);
			days.push(this.day(v, i));
			i++;
		}
		return days;
	},
	hour : function (value, hour) {
		return <li data-value={value} key={hour}>{hour}</li>
	},
	hours : function (pm) {
		var hrs = [];
		for (var i=1; i<=12; i++) {
			hrs.push(this.hour(pm ? i + 12 : i, i));
		}
		return hrs;
	},
	minute : function (value, key) {
		return <li data-value={value} key={key}>{value}</li>
	},
	minutes : function () {
		var mins = [];
		for (var i=0; i<4; i++) {
			mins.push(this.minute(minutes[i],i))
		}
		return mins;
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
			, days = this.days(value)
			, hours = this.hours(this.props.value.getHours > 11)
			, minutes = this.minutes();
		return (
			<div className="picker" onMouseDown={this.props.onMouseDown}>
				<div ref="day" className="day segment">
					<ul>
						<li></li>
						<li></li>
						{days}
						<li></li>
						<li></li>
					</ul>
				</div>
				<div ref="hour" className="hour segment">
					<ul>
						<li></li>
						<li></li>
						{hours}
						<li></li>
						<li></li>
					</ul>
				</div>
				<div ref="minute" className="minute segment">
					<ul>
						<li></li>
						<li></li>
						{minutes}
						<li></li>
						<li></li>
					</ul>
				</div>
				<div ref="phase" className="phase segment">
					<ul>
						<li></li>
						<li></li>
						<li data-value={0}>am</li>
						<li data-value={1}>pm</li>
						<li></li>
						<li></li>
					</ul>
				</div>
			</div>
		);
	}
});

var DateTimePicker = React.createClass({
	propTypes : {
		// Value for the datepicker
		value : React.PropTypes.object,
		// name of the field
		name : React.PropTypes.string.isRequired,

		// onChange handler
		onChange : React.PropTypes.func,
		// onChange handler in the form (value, name)
		onValueChange : React.PropTypes.func
	},

	// Component Lifecycle
	getInitialState : function () {
		var d = this.dateValue(this.props.value)
		d.setMinutes(Math.round(d.getMinutes() / 15) * 15);
		d.setSeconds(0);
		d.setMilliseconds(0);
		return {
			focused : false,
			value : d
		}
	},

	// Event Handlers
	onFocus : function (e) {
		this.setState({ focused : true });
	},
	onBlur : function (e) {
		this.setState({ focused : false });
	},
	onChange : function (value) {
		if (typeof this.props.onChange === "function") {
			this.props.onChange({
				name : this.props.name,
				value : value
			});
		}
	},
	onInputChange : function (e) {
		this._change();
	},
	onPickerChange : function (val) {
		this._change(val);
	},
	onPickerMouseDown : function (e) {
		e.preventDefault();
		// Cancel Blur event triggered by focusing the picker
		$(this.refs["field"].getDOMNode()).focus();
		return false;
	},

	// Render Methods
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
		var date = this.dateValue(value)
			, mins = (Math.round(date.getMinutes() / 15) * 15);
		
		if (mins === 0) { mins = "00"; }

		return months[date.getMonth()]  + " " + date.getDate() + " " + date.getFullYear() + " " + date.getHours() + ":" + mins;
	},
	render : function () {
		var value = this.dateValue(this.props.value)
			, stringValue = this.stringValue(value)
			, picker;

		if (this.state.focused) { 
			picker = <WheelPicker onMouseDown={this.onPickerMouseDown} value={value} onChange={this.onPickerChange} />
		}

		return (
			<div className="dateTimePicker">
				<input ref="field" type="text" onClick={this.onFocus} onTouchEnd={this.onFocus} onFocus={this.onFocus} onBlur={this.onBlur} value={stringValue} onChange={this.onInputChange} />
				{picker}
			</div>
		);
	}
});

module.exports = DateTimePicker;