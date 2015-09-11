var time = {
	months : ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
	days : { sun : 0, mon : 1, tue : 2, wed : 3, thu : 4, fri : 5, sat : 6 },
	hours : [1,2,3,4,5,6,7,8,9,10,11,12],
	minutes : [0,15,30,45],	
	// Check if an object is a Date.
	isDate : function (value) { 
		return (Object.prototype.toString.call(value) === "[object Date]");
	},

	dayOfTheWeek : function (date) {
		return this.days[date.toString().split(' ')[0].toLowerCase()]
	},

	dateString : function (date) {
		if (Object.prototype.toString.call(date) !== "[object Date]") { return ""; }
		return date.toString().split(' ')[0] + ". " + this.months[date.getMonth()] + " " + date.getDate()
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
	shortTimeString : function(date) {
		date = this.validDate(date)
		if (!date) { return ""; }

		var mins = date.getMinutes()
			, phase = (date.getHours() < 12) ? "am" : "pm"
			, hours = (phase === "am") ? date.getHours() : date.getHours() - 12 
		
		if (hours == 0) { hours = "12"; }

		return (mins != 0) ? hours + ":" + mins : hours;
	},

	timeRangeString : function (start,stop,showPhase) {
		if (!start || !stop) { return ""; }
		return time.timeString(start, showPhase) + " - " + time.timeString(stop, showPhase);
	},

	shortTimeRangeString : function (start,stop) {
		if (!start || !stop) { return ""; }
		return time.shortTimeString(start) + "-" + time.shortTimeString(stop);
	},

	dateRangeString : function (start,stop) {
		if (!start || !stop) { return ""; }
		return time.shortDateString(start) + " - " + time.shortDateString(stop);
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

	newDate : function (year, month, date, hours, minutes, seconds, millseconds) {
		var d = new Date();
		d.setFullYear(year || d.getFullYear());
		d.setMonth(month || 1);
		d.setDate(date || 1);
		d.setHours(hours || 0);
		d.setMinutes(minutes || 0);
		d.setSeconds(seconds || 0);
		d.setMilliseconds(millseconds || 0);

		return d;
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
	},
	// http://stackoverflow.com/questions/17415579/how-to-iso-8601-format-a-date-with-timezone-offset-in-javascript
	formatLocalDate : function(date) {
    var tzo = -date.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function(num) {
            var norm = Math.abs(Math.floor(num));
            return (norm < 10 ? '0' : '') + norm;
        };
    return date.getFullYear() 
        + '-' + pad(date.getMonth()+1)
        + '-' + pad(date.getDate())
        + 'T' + pad(date.getHours())
        + ':' + pad(date.getMinutes()) 
        + ':' + pad(date.getSeconds()) 
        + dif + pad(tzo / 60) 
        + ':' + pad(tzo % 60);
	},
	// http://stackoverflow.com/questions/11887934/check-if-daylight-saving-time-is-in-effect-and-if-it-is-for-how-many-hours
	standardTimezoneOffset : function(date) {
    var jan = new Date(date.getFullYear(), 0, 1);
    var jul = new Date(date.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
	},
	dst : function(date) {
    return date.getTimezoneOffset() < time.standardTimezoneOffset(date);
	},
	dstCompensate : function (date) {
		var offset = (date.getTimezoneOffset() - time.standardTimezoneOffset(date)) * 60 * 1000;
		console.log(new Date(date.valueOf() + offset));
		return new Date(date.valueOf() + offset);
	},
}

module.exports = time;