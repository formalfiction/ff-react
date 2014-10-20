/** @jsx React.DOM */

/* @stateful
 * @jQuery
 *
 * Wheelie Time Picker
 */

var iScroll = require('../deps/iscroll');

var months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']
	, days = { mon : -1 , tue : 0, wed : 1, thu : 2, fri : 3, sat : 4, sun : 5 }
	, hours = [1,2,3,4,5,6,7,8,9,10,11,12]
	, minutes = [0,15,30,45];

var DateTimePicker = React.createClass({
	propTypes : {
		// Center date to choose around. Defaults to the current time.
		// Should be a js Date object
		centerDate : React.PropTypes.object,
		// name of the field
		name : React.PropTypes.string.isRequired,
		// onChange handler
		onChange : React.PropTypes.func,
		// onChange handler in the form (value, name)
		onValueChange : React.PropTypes.func,
		// Value for the datepicker. Should be a js Date object
		value : React.PropTypes.object,
	},

	// Component Lifecycle
	getDefaultProps : function () {
		return {
			centerDate : new Date(),
			value : new Date()
		}
	},
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
		// for now we're providing a sort of fake event. 
		// probably a bad idea.
		if (typeof this.props.onChange === "function") {
			this.props.onChange({
				target : {
					name : this.props.name,
					value : value
				}
			});
		}
		if (typeof this.props.onValueChange === "function") {
			this.props.onValueChange(value, this.props.name);
		}
	},
	onKeyUp : function (e) {
		// kill keyboard input
		e.preventDefault();
		e.stopPropagation();
		return false;
	},
	onPickerChange : function (val, name) {
		this.onChange(val);
	},
	onInputChange : function (e) {
		// no-op
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
			, mins = (Math.round(date.getMinutes() / 15) * 15)
			, phase = (date.getHours() < 12) ? "am" : "pm"
			, hours = (phase === "am") ? date.getHours() : date.getHours() - 12 
		
		if (mins === 0) { mins = "00"; }

		if (date.getDate() === this.props.centerDate.getDate()) {
			return date.getHours() + ":" + mins + " " + phase;
		} else {
			return months[date.getMonth()]  + " " + date.getDate() + " " + hours + ":" + mins + " " + phase;
		}
	},
	render : function () {
		var value = new Date(this.dateValue(this.props.value))
			, stringValue = this.stringValue(value)
			, picker;

		if (this.state.focused) { 
			picker = <WheelPicker onMouseDown={this.onPickerMouseDown} value={value} centerDate={this.props.centerDate} onValueChange={this.onPickerChange} name={this.props.name} />
		}

		return (
			<div className="dateTimePicker">
				<input ref="field" type="text" onClick={this.onFocus} onTouchEnd={this.onFocus} onFocus={this.onFocus} onBlur={this.onBlur} value={stringValue} onChange={this.onInputChange} onKeyUp={this.onKeyUp} onChange={this.onInputChange} />
				{picker}
			</div>
		);
	}
});


/* @private
 * WheelPicker
 */
var WheelPicker = React.createClass({
	propTypes : {
		// The date to center the picker to. Defaults to now.
		centerDate : React.PropTypes.object.isRequired,
		// @private for now, don't modify this
		daysBack : React.PropTypes.number.isRequired,
		// @private for now, don't modify this
		daysForward : React.PropTypes.number.isRequired,
		// @private for now, don't modify this
		itemsShowing : React.PropTypes.number.isRequired,
		name : React.PropTypes.string.isRequired,
		onMouseDown : React.PropTypes.func,
		// Change in the form of (value, name)
		onValueChange : React.PropTypes.func.isRequired,
		// @private for now, don't modify.
		segments : React.PropTypes.array.isRequired,
		// should be a js date object
		value : React.PropTypes.object.isRequired,
	},


	// Component Lifecycle
	componentDidMount : function () {
		var self = this
			, options = {
					mouseWheel : true,
					snap : 'li',
					snapThreshold : 3
				};

		this.props.segments.forEach(function(segment){
			var name = segment + 'Scroll';
			self[name] = new iScroll(self.refs[segment].getDOMNode(), options);
			self[name].on('scrollEnd', self.scrollEnder(segment));
		});

		this.scrollToDate(this.props.value);
	},
	getDefaultProps : function () {
		return {
			segments : ['day','hour','minute','phase'],
			daysBack : 14,
			daysForward : 14,
			itemsShowing : 5,
			centerDate : new Date(),
			value : new Date()
		}
	},

	// Methods
	scrollToDate : function (date) {
		var startDate = new Date(this.props.centerDate)
		startDate.setDate(this.props.centerDate.getDate() - (this.props.daysBack));

		var days = Math.floor((date - startDate) / (1000*60*60*24))
			, lastDay = (this.props.daysBack + this.props.daysForward + 1)
			, hours = date.getHours()
			, minutes = Math.floor(date.getMinutes() / 15) + 1
			, pm = (hours > 11);


		if (pm) { hours = hours - 12; }
		
		if (days < 0) { days == 2; }
		if (days > lastDay) { days = lastDay - 2; }


		days = (days >= this.props.daysBack) ? days - 1 : days;
		hours = (hours > 0) ? hours - 1 : hours;
		minutes = (minutes > 0) ? minutes - 1 : minutes;

		this.dayScroll.goToPage(0,days,200);
		this.hourScroll.goToPage(0,hours,200);
		this.minuteScroll.goToPage(0,minutes,200);
		this.phaseScroll.goToPage(0, pm ? 1 : 0,200);
	},
	setSelected : function (iscroll, sel) {
		for (var i=0; i < iscroll.scroller.children.length; i++){
			iscroll.scroller.children[i].className = (sel === i) ? "selected" : "";
		}
	},

	// Factory Funcs
	scrollEnder : function (segment) {
		var self = this;
		return function (e) {
			// add one to choose the second displayed element (hopefully in the middle)
			var i = this.currentPage.pageY + 2
				// convert to number with +
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
					self.props.onChange(e);
				}
				if (typeof self.props.onValueChange === "function") {
					self.props.onValueChange(value, self.props.name);
				}
			}
		}
	},

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
	days : function () {
		var days = []
			, i = 0
			, v = new Date(this.props.centerDate);

		v.setDate(v.getDate() - this.props.daysBack);
		for (var j=0; j < this.props.daysBack; j++) {
			v.setDate(v.getDate() + 1);
			days.push(this.day(v, i));
			i++;
		}

		for (j=0; j < this.props.daysForward; j++) {
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
		return months[date.getMonth()]  + " " + date.getDate();
	},
	render : function () {
		var value = this.props.value
			, days = this.days()
			, hours = this.hours(this.props.centerDate.getHours() > 11)
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

module.exports = DateTimePicker;