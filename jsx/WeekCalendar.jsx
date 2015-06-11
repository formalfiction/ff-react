/** @jsx React.DOM */

var TouchAnchor = require('./TouchAnchor');

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
	, dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
	, days = { sun : 7, mon : 0, tue : 1, wed : 2, thu : 3, fri : 4, sat : 5 };

var WeekCalendar = React.createClass({
	propTypes : {
		name : React.PropTypes.string,
		// we accept onMouseDown & onTouchEnd Handlers
		// for use in conjunction with an input field
		// to cancel events that would blur the field.
		onMouseDown : React.PropTypes.func,
		onTouchEnd : React.PropTypes.func,
		// the date we want to see on the calendar
		// @todo - make this a date object
		value : React.PropTypes.object.isRequired,
		onChange : React.PropTypes.func,
		// onChange handler in the form (value, name)
		onValueChange : React.PropTypes.func,
		// an array of dates to show 
		data : React.PropTypes.array.isRequired,
		// if these funcs are defined, each data item will be passed
		dataStartDate : React.PropTypes.func,
		dataEndDate : React.PropTypes.func,
		dataTitle : React.PropTypes.func,
		dataAllDay : React.PropTypes.func,

		headerHeight : React.PropTypes.number,
		// it's an unfortunate limitation of this layout technique that we
		// need a definied pixel width 
		width : React.PropTypes.number.isRequired,
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
		// hourMarkers 

		// minute increment to snap the timeruler to. default is 15
		// set to 0 for no snapping
		timeRulerSnap : React.PropTypes.number
	},
	// Lifecycle
	getDefaultProps : function () {
		return {
			name : "calendar",
			value : new Date(),
			headerHeight : 50,
			width : 600,
			startHour : 7,
			endHour : 22 ,
			hourMarkers : [9,12,17],
			hourHeight : 50,
			timeRulerSnap : 15
		}
	},
	getInitialState : function () {
		var startDay = this.props.value.toString().split(' ')[0].toLowerCase()
			, monday = new Date(this.props.value)
			, sunday = new Date(this.props.value);
		
		monday.setDate(this.props.value.getDate() - days[startDay]);
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
		this.setState({
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
			, minute = ((y / this.props.hourHeight) + this.props.startHour) * 60
			, numIncs;

		if (this.props.timeRulerSnap) {
			numIncs = (60 / this.props.timeRulerSnap) * (this.props.endHour - this.props.startHour);

			for (var i=0; i < numIncs; i++) {
				var tick = i * this.props.timeRulerSnap
					, nextTick = (i+1) * this.props.timeRulerSnap;

				if (minute > tick && minute < nextTick) {
					y = (minute - tick < nextTick - minute) ? (this.props.hourHeight / 60) * tick : (this.props.hourHeight / 60) * nextTick;
					console.log(y);
				}
			}
		}

		var t = new Date();
		var roundHours = Math.floor(minute / 60)
			, roundMinutes = Math.round(minute - (roundHours * 60));

		t.setHours(roundHours);
		t.setMinutes(roundMinutes);

		this.setState({
			timeRuler : {
				y : y,
				time : t
			}
		});
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
					<div key={hr} className={(hr % 2 == 0) ? "even hourMarker" : "odd hourMarker"} style={style}>
						<div className="label" style={{ position : "absolute", top : -7, width : 50, left : this.props.width / 2 - 25, textAlign : "center" }}>{hr}</div>
					</div>
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
					data.push(<div key={"data-" + i} className="entry" style={style}>{this.dataTitle(d,i)}</div>);
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
			<div className="timeRuler" style={{ position : "absolute", left : 0, height : 0, width : this.props.width, top : this.state.timeRuler.y }}>
				<div className="label">""</div>
			</div>
		);
	},
	render : function () {
		var value = this.props.value
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
				, hours = [];

			headers.push(
				<div key={"header-" + d} className="dayHeader" style={this.headerStyle(d, width)}>{dayNames[d]}</div>
			);

			var dayStyle = {
				position : "absolute",
				width : width,
				height : dayHeight,
				top : 0,
				left : width * d
			}
			days.push(
				<div key={"day-"+d} className={(d % 2 == 0) ? "even day" : "odd day"} style={dayStyle}></div>
			);
		}

	 	return(
	 		<div ref="container" className="calendar week" style={{ position : "absolute", top : 0, left : 0, width : this.props.width }}>
	 			<header ref="header" style={{ width : "100%", height : this.props.headerHeight }}>
	 				{headers}
	 			</header>
	 			<div ref="viewport" className="viewport" style={viewportStyle} onMouseEnter={this.onSetTimeRuler} onMouseMove={this.onSetTimeRuler} onMouseLeave={this.onClearTimeRuler}>
		 			<div ref="document" className="document" style={{ position : "absolute", top : 0, left : 0, width : this.props.width, height : dayHeight }}>
		 				<div className="days">
		 					{days}
		 				</div>
		 				<div className="hours">
			 				{this.renderHourMarkers()}
			 			</div>
			 			<div className="entries">
			 				{this.renderData()}
			 			</div>
			 			{this.renderTimeRuler()}
		 			</div>
	 			</div>
	 		</div>
 		);
	 }
});

module.exports = WeekCalendar;