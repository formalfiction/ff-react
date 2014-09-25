/** @jsx React.DOM */

var iScroll = require('../deps/iscroll');

var months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']
	, days = { mon : -1 , tue : 0, wed : 1, thu : 2, fri : 3, sat : 4, sun : 5 }
	, hours = [1,2,3,4,5,6,7,8,9,10,11,12]
	, minutes = [0,15,30,45]
	, now = new Date();

var WheelPicker = React.createClass({displayName: 'WheelPicker',
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
		});

		this.scrollToDate(now);
	},
	scrollToDate : function (date) {
		var hours = date.getHours()
			, minutes = Math.round(date.getMinutes() / 15)
			, pm = (hours > 11);

		if (pm) { hours = hours - 12; }

		this.dayScroll.scrollToElement(this.dayScroll.scroller.children[this.daysBack - 1],0);
		this.hourScroll.scrollToElement(this.hourScroll.scroller.children[hours - 1],0);
		this.minuteScroll.scrollToElement(this.minuteScroll.scroller.children[minutes - 1],0);
		this.phaseScroll.scrollToElement(this.phaseScroll.scroller.children[pm ? 1 : 0],0);
	},
	scrollEnder : function (segment) {
		var self = this;
		return function () {
			// add one to choose the second displayed element (hopefully in the middle)
			var i = this.currentPage.pageY + 1
				, scrollValue = +this.scroller.children[i].getAttribute('data-value')
				, oldValue = self.props.value
				, value = new Date(self.props.value);

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
				console.log(value);
				if (typeof self.props.onChange === "function") {
					self.props.onChange(value);
				}
			}
		}
	},
	daysBack : 14,
	daysForward : 14,
	day : function (date, key) {
		return React.DOM.li( {'data-year':date.getFullYear(), 'data-month':date.getMonth(), 'data-value':date.getDate(), key:key}, this.stringValue(date))
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
		return React.DOM.li( {'data-value':value, key:hour}, hour)
	},
	hours : function (pm) {
		var hrs = [];
		for (var i=1; i<=12; i++) {
			hrs.push(this.hour(pm ? i + 12 : i, i));
		}
		return hrs;
	},
	minute : function (value, key) {
		return React.DOM.li( {'data-value':value, key:key}, value)
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
			React.DOM.div( {className:"picker", onMouseDown:this.props.onMouseDown}, 
				React.DOM.div( {ref:"day", className:"day segment"}, 
					React.DOM.ul(null, 
						React.DOM.li(null),
						days,
						React.DOM.li(null)
					)
				),
				React.DOM.div( {ref:"hour", className:"hour segment"}, 
					React.DOM.ul(null, 
						React.DOM.li(null),
						hours,
						React.DOM.li(null)
					)
				),
				React.DOM.div( {ref:"minute", className:"minute segment"}, 
					React.DOM.ul(null, 
						React.DOM.li(null),
						minutes,
						React.DOM.li(null)
					)
				),
				React.DOM.div( {ref:"phase", className:"phase segment"}, 
					React.DOM.ul(null, 
						React.DOM.li(null),
						React.DOM.li( {'data-value':0}, "am"),
						React.DOM.li( {'data-value':1}, "pm"),
						React.DOM.li(null)
					)
				)
			)
		);
	}
});

var DateTimePicker = React.createClass({displayName: 'DateTimePicker',
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
	_focus : function (e) {
		this.setState({ focused : true });
	},
	_blur : function (e) {
		// this.setState({ focused : false });
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
		return months[date.getMonth()]  + " " + date.getDate() + " " + date.getFullYear() + " " + date.getHours() + ":" + (Math.round(date.getMinutes() / 15) * 15);
	},
	render : function () {
		var value = this.dateValue(this.props.value)
			, stringValue = this.stringValue(value)
			, picker;

		if (this.state.focused) { 
			picker = WheelPicker( {onMouseDown:this._pickerMouseDown, value:value, onChange:this._pickerChange} )
		}

		return (
			React.DOM.div( {className:"dateTimePicker"}, 
				React.DOM.input( {ref:"field", type:"text", onClick:this._focus, onTouchEnd:this._focus, onFocus:this._focus, onBlur:this._blur, value:stringValue, onChange:this._inputChange} ),
				picker
			)
		);
	}
});

module.exports = DateTimePicker;