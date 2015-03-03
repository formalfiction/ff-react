/** @jsx React.DOM */

/* @stateful
 * @jQuery
 *
 * Wheelie Time Picker
 * 
 * **Picker Show / Hiding & Touch Events**
 * 
 */


var iScroll = require('../deps/iscroll');

var hours = [1,2,3,4,5,6,7,8,9,10,11,12]
	, minutes = [0,15,30,45];


var TimeWheelPicker = React.createClass({
	propTypes : {
		className : React.PropTypes.string,
		// name of the field
		name : React.PropTypes.string.isRequired,
		// onChange handler in the form (value, name)
		onValueChange : React.PropTypes.func,
		// Value for the datepicker. Should be a js Date object
		value : React.PropTypes.object
	},

	// Component Lifecycle
	getDefaultProps : function () {
		return {
			className : "timeWheelPicker",
			centerDate : new Date(),
			value : new Date(),
		}
	},
	getInitialState : function () {
		var d = this.dateValue(this.props.value)
		d.setMinutes(Math.round(d.getMinutes() / 15) * 15);
		d.setSeconds(0);
		d.setMilliseconds(0);
		return {
			focused : false,
			value : d,
		}
	},

	// Method
	focus : function () {
		this.setState({ focused : true });
	},
	blur : function () {
		this.setState({ focused : false });
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
	},
	onPickerChange : function (value, name) {
		if (typeof this.props.onValueChange === "function") {
			this.props.onValueChange(value, name);
		}
	},
	onToggleCalendar : function () {
		var o = {};
		o.showCalendar = !this.state.showCalendar;
		this.setState(o);
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
		if (hours == 0) { hours = "12"; }

		return hours + ":" + mins + " " + phase;
	},
	render : function () {
		var value = new Date(this.dateValue(this.props.value))
			, stringValue = this.stringValue(value)
			, picker;

		if (this.state.focused) {
			picker = <WheelPicker onMouseDown={this.onPickerMouseDown} killTouch={true} value={value} centerDate={this.props.centerDate} onValueChange={this.onPickerChange} name={this.props.name} />
		}

		return (
			<div className={this.props.className}>
				<input readOnly ref="field" type="text" onClick={this.onFocus} onTouchEnd={this.onFocus} onFocus={this.onFocus} onBlur={this.onBlur} value={stringValue} onChange={this.onInputChange} onKeyUp={this.onKeyUp} onChange={this.onInputChange} />
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
		killTouch : React.PropTypes.bool.isRequired,
		name : React.PropTypes.string.isRequired,
		onMouseDown : React.PropTypes.func,
		onTouchEnd : React.PropTypes.func,
		onShowCalendar : React.PropTypes.func,
		// Change in the form of (value, name)
		onValueChange : React.PropTypes.func.isRequired,
		// @private for now, don't modify.
		segments : React.PropTypes.array.isRequired,
		// should be a js date object
		value : React.PropTypes.object.isRequired,
	},

	// Component Lifecycle
	getDefaultProps : function () {
		return {
			segments : ['hour','minute','phase'],
			itemsShowing : 5,
			killTouch : false,
			value : new Date(),
		}
	},
	componentDidMount : function () {
		var self = this
			, options = {
					mouseWheel : true,
					snap : 'li',
					snapThreshold : 3,
				};

		this.props.segments.forEach(function(segment){
			var name = segment + 'Scroll';
			self[name] = new iScroll(self.refs[segment].getDOMNode(), options);
			self[name].on('scrollEnd', self.scrollEnder(segment));
			self[name].on('touchEnd', self.props.onTouchEnd);
		});

		this.scrollToTime(this.props.value);
	},

	// Methods
	scrollToTime : function (date) {

		var hours = date.getHours()
			, minutes = Math.floor(date.getMinutes() / 15) + 1
			, pm = (hours > 11);

		if (pm) { hours = hours - 12; }

		hours = (hours > 0) ? hours - 1 : hours;
		minutes = (minutes > 0) ? minutes - 1 : minutes;

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
		return function () {
			// add two to choose the center element (hopefully in the middle)
			var i = this.currentPage.pageY + 2
				// convert to number with +
				, scrollValue = +this.scroller.children[i].getAttribute('data-value')
				, oldValue = self.props.value
				, value = new Date(self.props.value);

			self.setSelected(this, i);

			switch (segment) {
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
				self.props.onValueChange(value, self.props.name);
			}
		}
	},

	// Event Handlers
	onTouchEnd : function (e) {
		if (this.props.killTouch) {
			e.stopPropagation();
			this[e.currentTarget.getAttribute('data-name') + "Scroll"].handleEvent(e);
		}
	},

	onShowCalendar : function (e) {
		if (typeof this.props.onShowCalendar === "function") {
			e.stopPropagation();
			this.props.onShowCalendar();
		}
	},

	// Render Methods
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

	render : function () {
		var value = this.props.value
			, hours = this.hours(this.props.centerDate.getHours() > 11)
			, minutes = this.minutes();

		return (
			<div className="picker" onMouseDown={this.props.onMouseDown}>
				<div ref="hour" data-name="hour" className="hour segment" onTouchEnd={this.onTouchEnd}>
					<ul>
						<li></li>
						<li></li>
						{hours}
						<li></li>
						<li></li>
					</ul>
				</div>
				<div ref="minute" data-name="minute" className="minute segment" onTouchEnd={this.onTouchEnd}>
					<ul>
						<li></li>
						<li></li>
						{minutes}
						<li></li>
						<li></li>
					</ul>
				</div>
				<div ref="phase" data-name="phase" className="phase segment" onTouchEnd={this.onTouchEnd}>
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

module.exports = TimeWheelPicker;