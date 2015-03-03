/** @jsx React.DOM */

var Time = require('../utils/time');

var TimeSpanInput = React.createClass({
	propTypes : {
		name : React.PropTypes.string,
		// must be a tuple of two date objects:
		// [statDate, endDate]
		value : React.PropTypes.array.isRequired,
		onChange : React.PropTypes.func,
		onValueChange : React.PropTypes.func,
	},

	// Lifecycle
	getDefaultProps : function () {
		return {
			name : "timeSpanPicker",
			interval : 15,
			value : [new Date(), new Date()],
		}
	},

	// Methods
	roundDate : function (date){
		if (this.props.interval > 60 && this.props.interval !== 0) {
			// Hour only
			date.setMinutes(0);
		} else {
			// Everything else
			date.setMinutes(this.props.interval * Math.round(date.getMinutes() / this.props.interval));
		}

		date.setSeconds(0);
		date.setMilliseconds(0);

		return date;
	},

	// Event Handlers
	onValueChange : function (value, name) {
		if (name === "start") {
			// always deliver round dates.
			var end = this.roundDate(this.props.value[1]);

			if (end.valueOf() < value.valueOf()) {
				end = new Date(value);
			}
			this.props.onValueChange([value, end], this.props.name);
		} else if (name === "end") {
			// always deliver round dates.
			var start = this.roundDate(this.props.value[0]);

			if (start.valueOf() > value.valueOf()) {
				start = value;
			}

			this.props.onValueChange([start, value], this.props.name);
		}
	},

	// Render
	render : function () {
		return (
			<div className="timeSpanInput">
				<TimeColumnPicker className="start picker" name="start" value={this.props.value[0]} mustBefore={this.props.value[1]}  interval={this.props.interval} onValueChange={this.onValueChange} />
				<p className="divider">-</p>
				<TimeColumnPicker className="end picker" name="end" value={this.props.value[1]} mustAfter={this.props.value[0]} interval={this.props.interval} onValueChange={this.onValueChange} />
			</div>
		);
	}
});


// A Single Column Time Picker
var iScroll = require('../deps/iscroll');

var TimeColumnPicker = React.createClass({
	propTypes : {
		value : React.PropTypes.object.isRequired,
		mustBefore : React.PropTypes.object,
		mustAfter : React.PropTypes.object,
		// interval in minutes
		interval : React.PropTypes.number,
	},

	// Lifecycle
	getDefaultProps : function () {
		return {
			className : "timeColumnPicker",
			interval : 15
		}
	},

	componentDidMount : function () {
		var options = {
					mouseWheel : true,
					snap : 'li',
					snapThreshold : 3,
				};

		this.scroller = new iScroll(this.refs["scroller"].getDOMNode(), options);
		this.scroller.on('scrollEnd', this.scrollEnder());
		this.scroller.on('touchEnd', this.props.onTouchEnd);

		// this.silent = true;
		this.scrollToTime(this.props.value);
	},
	componentDidUpdate : function () {
		this.silent = true;
		this.scrollToTime(this.props.value);
	},

	// Methods
	scrollToTime : function (date) {
		var i = date.getHours()
			, minutes;

		if (this.props.interval < 60 && this.props.interval !== 0) {
			minI = Math.round(date.getMinutes() / this.props.interval);
			i = (i * Math.round(60 / this.props.interval)) + minI;
		} else {
			// if we're in hour-only mode, we still need to check to see
			// if minutes puts us closer to one hour or the other
			if (date.getMinutes() != 0) {
				i += Math.round(date.getMinutes() / 60);
			}
		}

		// add the offset?
		// i += 3

		this.scroller.goToPage(0,i,200);
	},
	setSelected : function (iscroll, sel) {
		for (var i=0; i < iscroll.scroller.children.length; i++){
			iscroll.scroller.children[i].className = (sel === i) ? "selected" : "";
		}
	},

	// Factory Funcs
	scrollEnder : function () {
		var self = this
		return function () {
			// add 3 to choose the center element (hopefully in the middle)
			var i = this.currentPage.pageY + 3
				, el = this.scroller.children[i]
				, value = new Date(self.props.value);

			self.setSelected(this, i);

			// convert to number with +
			value.setHours(+el.getAttribute('data-hours'));
			value.setMinutes(+el.getAttribute('data-minutes'));
			value.setSeconds(0);
			value.setMilliseconds(0);

			if (self.silent) {
				self.silent = false;
				return;
			}


			if (self.props.value.valueOf() != value.valueOf()) {
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

	// iterate over each time, calling func
	// with (hour, min, phase, index)
	eachTime : function (func) {
		var l = 24, interval, d;

		// count by hours if interval is either 0 or 60
		if (!this.props.interval || this.props.interval >= 60) {
			for (var h=0; h <= l; h++) {
				func(h, 0, h);
			}

		// otherwise use an inner loop for minutes
		} else {
			var i = 0;
			for (var h=0; h <= l; h++) {
				for (var m=0; m < 60; m += this.props.interval) {
					func(h, m, i);
					i++;
				}
			}
		}
	},

	// Render 
	render : function () {
		var times = [];

		this.eachTime(function (hr,min,index) {
			var phase = (hr < 12) ? "am" : "pm"
				, displayHour = (hr < 12) ? hr : hr - 12;
			if (displayHour === 0) { displayHour = 12; }
			if (min === 0) { min = "00"; }
			times.push(<li key={index} data-hours={hr} data-minutes={min}>{displayHour + ":" + min + phase}</li>);
		});

		return (
			<div {...this.props} ref="scroller">
				<ul>
					<li></li>
					<li></li>
					<li></li>
					{times}
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</div>
		);
	}
});

module.exports = TimeSpanInput;