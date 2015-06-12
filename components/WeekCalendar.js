/** @jsx React.DOM */

var Time = require('../utils/time')
	, TouchAnchor = require('./TouchAnchor');

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
	, dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
	, days = { sun : 7, mon : 0, tue : 1, wed : 2, thu : 3, fri : 4, sat : 5 };


function copyTouch (t) {
	return { identifier: t.identifier, pageX: t.pageX, pageY: t.pageY, screenX : t.screenX, screenY : t.screenY };
}


var WeekCalendar = React.createClass({displayName: "WeekCalendar",
	propTypes : {
		// it's an unfortunate limitation of this layout technique that we
		// need a definied pixel width 
		width : React.PropTypes.number.isRequired,
		// an array of dates to show 
		data : React.PropTypes.array.isRequired,
		// the date we want to see on the calendar, must be a valid date object
		// will default to the current date, the view will automatically
		// put monday first
		date : React.PropTypes.object,
		// onChange handler in the form (value, name)
		onValueChange : React.PropTypes.func,
		// if these funcs are defined, each data item will be passed a data item, and the iteration
		dataStartDate : React.PropTypes.func,
		dataEndDate : React.PropTypes.func,
		dataTitle : React.PropTypes.func,
		dataAllDay : React.PropTypes.func,

		headerHeight : React.PropTypes.number,
		// optional. pass in a height & we'll scale this shit to that height
		// if height isn't defined, you can tune vertical scaling with "hourHeight"
		height : React.PropTypes.number,
		// height of an hour in pixels. if both height & hourHeight are set
		// scrolling will enable if needed
		hourHeight : React.PropTypes.number,
		// starting hour to display in military time. defaults to 7am
		startHour : React.PropTypes.number,
		// ending hour to display in military time. defaults to 10pm
		endHour : React.PropTypes.number,
		// either a string, or an array of integers in miltary time
		// to show markers for
		hourMarkers : React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.array]),

		// minute increment to snap the timeruler to. default is 15
		// set to 0 for no snapping
		timeRulerSnap : React.PropTypes.number,
		// a popover component to present on clicking
		popover : React.PropTypes.func,
		// how far (in pixels) a touch event has to move before
		// it's considered scrolling instead of a tap
		yTouchThreshold : React.PropTypes.number,
		// handler for when a data item is clicked
		onSelectData : React.PropTypes.func,
		// @todo - currently unimplemented
		// handler for when UI manipulations are made to a data object, such as dragging
		// a data object, or extending an end time
		onChangeData : React.PropTypes.func
	},

	startTouch : undefined,
	endTouch : undefined,

	// Lifecycle
	getDefaultProps : function () {
		return {
			name : "calendar",
			date : new Date(),
			headerHeight : 50,
			width : 600,
			startHour : 7,
			endHour : 22 ,
			hourMarkers : [9,12,17],
			hourHeight : 50,
			timeRulerSnap : 15,
			yTouchThreshold : 5
		}
	},
	getInitialState : function () {
		var startDay = this.props.date.toString().split(' ')[0].toLowerCase()
			, monday = new Date(this.props.date)
			, sunday = new Date(this.props.date);
		
		monday.setDate(this.props.date.getDate() - days[startDay]);
		sunday.setDate(monday.getDate() + 6);

		return {
			monday : monday,
			sunday : sunday,
			hourHeight : (this.props.height) ? this.props.height / (this.props.endHour - this.props.startHour) : this.props.hourHeight
		}
	},
	componentDidMount : function () {
	},
	componentDidUpdate : function () {
	},
	componentWillReceiveProps : function (nextProps) {
		var startDay = nextProps.date.toString().split(' ')[0].toLowerCase()
			, monday = new Date(nextProps.date)
			, sunday = new Date(nextProps.date);
		
		monday.setDate(this.props.date.getDate() - days[startDay]);
		sunday.setDate(monday.getDate() + 6);

		this.setState({
			monday : monday,
			sunday : sunday,
			hourHeight : (nextProps.height) ? (nextProps.height - this.props.headerHeight) / (nextProps.endHour - nextProps.startHour) : nextProps.hourHeight
		});
	},

	// Methods
	dataStartDate : function (d, i) {
		d || (d = {})
		return (typeof this.props.dataStartDate == "function") ? this.props.dataStartDate(d, i) : d.startDate;
	},
	dataEndDate : function (d, i) {
		d || (d = {})
		return (typeof this.props.dataEndDate == "function") ? this.props.dataEndDate(d, i) : d.endDate;
	},
	dataTitle : function (d, i) {
		d || (d = {})
		return (typeof this.props.dataTitle == "function") ? this.props.dataTitle(d, i) : d.title;
	},
	dataAllDay : function (d, i) {
		d || (d = {})
		return (typeof this.props.dataAllDay == "function") ? this.props.dataAllDay(d, i) : d.allDay || false;
	},

	// @return bool
	showHourMarker : function (hr) {
		if (this.props.hourMarkers == "every") { return true; }
		else {
			// @todo check to make sure this is an array
			for (var i=0; i < this.props.hourMarkers.length; i++) {
				if (this.props.hourMarkers[i] === hr) {
					return true;
				}
			}
		}
		return false; 
	},


	// Event Handlers
	onClick : function (e) {
		if (typeof this.props.popover === "function") {
			this.setState({ 
				popover : { 
					y : e.clientY - e.currentTarget.getBoundingClientRect().top + e.currentTarget.scrollTop,
					x : e.clientX - e.currentTarget.getBoundingClientRect().left + e.currentTarget.scrollLeft,
					date : this.state.timeRuler.time
				}
			});
		}
	},
	onClosePopover : function () {
		this.setState({ popover : undefined });
	},
	onTouchStart : function (e) {
		this.startTouch = copyTouch(e.touches[0]);
	},
	onTouchEnd : function (e) {
		this.endTouch = copyTouch(e.changedTouches[0]);

		// Only trigger toClient if not scrolling
		if (Math.abs(this.startTouch.pageY - this.endTouch.pageY) < this.props.yTouchThreshold && this.isMounted()) {
			// BookingActions.toBooking(this.props.role, this.props.data.id);
			this.onClick(this.endTouch);
		}

		this.startTouch = undefined;
		this.endTouch = undefined;
	},
	onSelectData : function (e) {
		var i = +e.target.getAttribute('data-index');
		if (typeof this.props.onSelectData === "function") {
			this.props.onSelectData(this.props.data[i]);
		}
	},
	onSelectDay : function (e) {
		e.preventDefault();
		var value = +e.target.getAttribute("data-value")
			, d = new Date(value);
			
		if (typeof this.props.onChange === "function") {
			this.props.onChange(d);
		} else if (typeof this.props.onValueChange === "function") {
			this.props.onValueChange(d, this.props.name);
		}
	},
	onPrevWeek : function (e) {
		var d = this.state.displayMonth;
		if (d.getMonth() > 0) {
			d.setMonth(d.getMonth() - 1);
		} else {
			d.setYear(d.getFullYear() - 1);
			d.setMonth(11);
		}
		
		this.setState({ displayMonth : d });
	},
	onNextWeek : function (e) {
		var d = this.state.displayMonth;
		if (d.getMonth() < 11) {
			d.setMonth(d.getMonth() + 1);
		} else {
			d.setYear(d.getFullYear() + 1);
			d.setMonth(0);
		}

		this.setState({ displayMonth : d });
	},
	onSetTimeRuler : function (e) {
		var y = e.clientY - e.currentTarget.getBoundingClientRect().top + e.currentTarget.scrollTop
			, x = e.clientX - e.currentTarget.getBoundingClientRect().left + e.currentTarget.scrollLeft
			, dayInt = Math.floor(x / (this.props.width / 7))
			, minute = ((y / this.props.hourHeight) + this.props.startHour) * 60
			, numTicks
			, tick = 0, nextTick = 0;

		if (this.props.timeRulerSnap) {
			numTicks = (60 / this.props.timeRulerSnap) * ((this.props.endHour - this.props.startHour) * 60);

			for (var i=0; i < numTicks; i++) {
				var tick = i * this.props.timeRulerSnap
					, nextTick = (i+1) * this.props.timeRulerSnap;

				if (minute > tick && minute < nextTick) {
					// shift y to the appriate snap value
					if (minute - tick < nextTick - minute) {
						y -= (this.props.hourHeight / 60) * (minute - tick);
						minute = tick;
					} else {
						y += (this.props.hourHeight / 60) * (nextTick - minute);
						minute = nextTick;
					}
					break;
				}
			}
		}

		var t = new Date(this.state.monday);
		var roundHours = Math.floor(minute / 60)
			, roundMinutes = Math.round(minute - (roundHours * 60));

		t.setDate(t.getDate() + dayInt)
		t.setHours(roundHours);
		t.setMinutes(roundMinutes);
		t.setSeconds(0);
		t.setMilliseconds(0);

		this.setState({ timeRuler : {
			y : y,
			time : t
		}});
	},
	onClearTimeRuler : function () {
		this.setState({ timeRuler : undefined });
	},

	// Render
	headerStyle : function (i, width) {
		return {  position : "absolute", 
							width : width,
							height : this.props.headerHeight,
							top : 0, 
							left : width * i
						};
	},
	renderHourMarkers : function () {
		var hours = [];
		for (var hr=this.props.startHour; hr <= this.props.endHour; hr++) {
			if (this.showHourMarker(hr)) {
				var style = { position : "absolute",
											top : this.props.hourHeight * (hr - this.props.startHour),
											left : 0,
											width : this.props.width,
											height : 0
										};
				hours.push(
					React.createElement("div", {key: hr, className: (hr % 2 == 0) ? "even hourMarker" : "odd hourMarker", style: style}, 
						React.createElement("div", {className: "label", style: { position : "absolute", top : -10, width : 70, left : this.props.width / 2 - 35, textAlign : "center"}}, (hr <= 12) ? hr + ":00am" : (hr - 12) + ":00pm")
					)
				);
			}
		}

		return hours;
	},
	renderData : function () {
		var data = [];
		var width = this.props.width / 7

		for (var i=0, d; d=this.props.data[i]; i++) {
			var startDate = this.dataStartDate(d,i)
				, endDate = this.dataEndDate(d,i)
				, allDay = this.dataAllDay(d,i)
				, style, height;

			if (!startDate || !endDate) { console.log("invalid data element %s",i); console.log(d); continue; }
			if (!allDay) {
				if (startDate.valueOf() > this.state.monday.valueOf() && startDate.valueOf() < this.state.sunday.valueOf()) {
					style = {
						position : "absolute",
						left : width * days[startDate.toString().split(' ')[0].toLowerCase()],
						top : Math.round((startDate.getHours() + (startDate.getMinutes() / 60) - this.props.startHour) * this.props.hourHeight),
						width : width,
						height : ((endDate.valueOf() - startDate.valueOf()) / 1000 / 60 / 60) * this.props.hourHeight
					}
					data.push(React.createElement("div", {key: "data-" + i, className: "entry", style: style, "data-index": i, onClick: this.onSelectData}, this.dataTitle(d,i)));
				}
			} else {
				// @todo - put allDay entires along the top
			}
		}

		return data;
	},
	renderTimeRuler : function () {
		if (!this.state.timeRuler) { return; }

		return (
			React.createElement("div", {className: "timeRuler", style: { position : "absolute", left : 0, height : 0, width : this.props.width, top : this.state.timeRuler.y}}, 
				React.createElement("div", {className: "label"}, Time.timeString(this.state.timeRuler.time))
			)
		);
	},
	renderPopover : function () {
		if (!this.state.popover) { return undefined; }
		return React.createElement(this.props.popover, React.__spread({},  this.props, {x: this.state.popover.x, y: this.state.popover.y, position: "top", onClose: this.onClosePopover, date: this.state.popover.date}))
	},
	render : function () {
		var value = this.props.date
			, dayHeight = ((this.props.endHour - this.props.startHour) * this.props.hourHeight) - this.props.headerHeight 
			, viewportStyle = {
				position : "absolute",
				top : this.props.headerHeight,
				left : 0,
				width : this.props.width,
				height : (this.props.height) ? (this.props.height - this.props.headerHeight) : dayHeight,
				overflow : (this.props.height) ? "auto" : undefined
			}
			, headers = [], days = [];

		for (var d=0; d < 7; d++) {
			var width = this.props.width / 7
				, hours = []
				, day = new Date(this.state.monday);

			day.setDate(day.getDate() + d);

			headers.push(
				React.createElement("div", {key: "header-" + d, className: "dayHeader", style: this.headerStyle(d, width)}, 
					React.createElement("p", null, dayNames[d], React.createElement("br", null), day.getDate(), "/", day.getMonth())
				)
			);

			var dayStyle = {
				position : "absolute",
				width : width,
				height : dayHeight,
				top : 0,
				left : width * d
			}
			days.push(
				React.createElement("div", {key: "day-"+d, className: (d % 2 == 0) ? "even day" : "odd day", style: dayStyle})
			);
		}

	 	return(
	 		React.createElement("div", {ref: "container", className: "calendar week", style: { position : "absolute", top : 0, left : 0, width : this.props.width}}, 
	 			React.createElement("header", {ref: "header", style: { width : "100%", height : this.props.headerHeight}}, 
	 				headers
	 			), 
	 			React.createElement("div", {ref: "viewport", className: "viewport", style: viewportStyle, 
			 			onMouseEnter: this.onSetTimeRuler, onMouseMove: this.onSetTimeRuler, onMouseLeave: this.onClearTimeRuler, 
			 			onClick: this.onClick, onTouchStart: this.onTouchStart, onTouchEnd: this.onTouchEnd}, 
		 			React.createElement("div", {ref: "document", className: "document", style: { position : "absolute", top : 0, left : 0, width : this.props.width, height : dayHeight}}, 
		 				React.createElement("div", {className: "days"}, 
		 					days
		 				), 
		 				React.createElement("div", {className: "hours"}, 
			 				this.renderHourMarkers()
			 			), 
			 			React.createElement("div", {className: "entries"}, 
			 				this.renderData()
			 			), 
			 			this.renderTimeRuler(), 
			 			this.renderPopover()
		 			)
	 			)
	 		)
 		);
	 }
});

module.exports = WeekCalendar;