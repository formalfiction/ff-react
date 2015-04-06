var time = {
	months : ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
	days : { mon : -1 , tue : 0, wed : 1, thu : 2, fri : 3, sat : 4, sun : 5 },
	hours : [1,2,3,4,5,6,7,8,9,10,11,12],
	minutes : [0,15,30,45],	
	// Check if an object is a Date.
	isDate : function (value) { 
		return (Object.prototype.toString.call(value) === "[object Date]");
	},

	shortDateString : function (date) {
		if (Object.prototype.toString.call(date) !== "[object Date]") { return ""; }
		return this.months[date.getMonth()] + " " + date.getDate()
	},

	// returns a string representation of the number of hours 
	// between two dates, fixed to 2 decimal places
	hourDuration : function (startDate, endDate) {
		var diff = endDate.valueOf() - startDate.valueOf()
			, hours = diff / (1000 * 60 * 60);
		return hours.toFixed(2);
	},

	midnightToday : function () {
		var now = new Date()
		return new Date(now.getFullYear(),now.getMonth(),now.getDate(),0,0,0,0);
	},

	// Ensure Value is a valid date.
	validDate : function (value) {
		if (!this.isDate(value)) {
			if ( (typeof value === "number" && value != NaN) ||
					 (typeof value === "string")
				 ) {
				value = new Date(value);
			} else {
				return false;
			}
		}

		return value;
	},

	daysDiff : function (start, end) {
		return Math.round((end - start) / (1000*60*60*24))
	},

	dateTimeString : function (date) {
		date = this.validDate(date)
		if (!date) { return ""; }

		var mins = date.getMinutes()
			, phase = (date.getHours() < 12) ? "am" : "pm"
			, hours = (phase === "am") ? date.getHours() : date.getHours() - 12 
		
		if (mins === 0) { mins = "00"; }
		if (hours == 0) { hours = "12"; }

		return this.months[date.getMonth()]  + " " + date.getDate() + " " + hours + ":" + mins + " " + phase;
	},

	// returns a time string.
	// eg. 9:00pm
	timeString : function (date, showPhase) {
		date = this.validDate(date)
		if (!date) { return ""; }
		if (showPhase === undefined) { showPhase = true; }

		var mins = date.getMinutes()
			, phase = (date.getHours() < 12) ? "am" : "pm"
			, hours = (phase === "am") ? date.getHours() : date.getHours() - 12 
		
		if (mins === 0) { mins = "00"; }
		if (hours == 0) { hours = "12"; }

		return showPhase ? hours + ":" + mins + phase : hours + ":" + mins;
	},

	timeRangeString : function (start,stop,showPhase) {
		if (!start || !stop) { return ""; }
		return time.timeString(start, showPhase) + " - " + time.timeString(stop, showPhase);
	},


	shiftDate : function (minutes, hours, days) {
		var n = new Date()
		n.setMinutes(n.getMinutes()+minutes);
		n.setHours(n.getHours()+hours);
		n.setDate(n.getDate()+days);
		return n;
	},

	relativeDateString : function (date, now) {
		date = this.validDate(date)
		if (!date) { return ""; }
		
		if (!now) { now = new Date(); }
		return (date.valueOf() > now.valueOf()) ? time.relativeFutureDateString(date, now) : time.relativePastDateString(date, now);
	},

	// http://ejohn.org/blog/javascript-pretty-date/
	relativePastDateString : function (date, now) {
		date = this.validDate(date)
		if (!date) { return ""; }
		if (!now) { now = new Date(); }
		 
    var diff = (( (now).getTime() - date.getTime()) / 1000),
        dayDiff = Math.floor(diff / 86400);

    if (isNaN(dayDiff) || dayDiff < 0 || dayDiff >= 31) return;

		return dayDiff == 0 && (
														diff < 60 && "just now" ||
														diff < 120 && "1 minute ago" ||
														diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
														diff < 7200 && "1 hour ago" ||
														diff < 86400 && Math.floor( diff / 3600 ) + " hours ago" ) ||
													dayDiff == 1 && "Yesterday" ||
													dayDiff < 7 && dayDiff + " days ago" ||
													dayDiff < 31 && Math.ceil( dayDiff / 7 ) + " weeks ago";

	},

	relativeFutureDateString : function (date, now) {
		if (!this.validDate(date)) { return ""; }
		if (!now) { now = new Date(); }

	  var diff = ((date.getTime() - (now).getTime()) / 1000),
		    dayDiff = Math.floor(diff / 86400);

    if (isNaN(dayDiff) || dayDiff < 0 || dayDiff >= 31) return;

		return dayDiff == 0 && (
														diff < 60 && "just now" ||
														diff < 120 && "in 1 minute" ||
														diff < 3600 && "in " + Math.floor( diff / 60 ) + " minutes" ||
														diff < 7200 && "in 1 hour" ||
														diff < 86400 && "in " + Math.floor( diff / 3600 ) + " hours") ||
													dayDiff == 1 && "Tomorrow" ||
													dayDiff < 7 && "in " + dayDiff + " days" ||
													dayDiff < 31 && "in " + Math.ceil( dayDiff / 7 ) + " weeks";
	}

}

module.exports = time;