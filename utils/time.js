
var time = {
	months : ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
	days : { mon : -1 , tue : 0, wed : 1, thu : 2, fri : 3, sat : 4, sun : 5 },
	hours : [1,2,3,4,5,6,7,8,9,10,11,12],
	minutes : [0,15,30,45],	
	// Check if an object is a Date.
	isDate : function (value) { 
		return (Object.prototype.toString.call(value) === "[object Date]");
	},
	isObject : function (value) {
		return (Object.prototype.toString.call(value) === "[object Object]");
	},
	isArray : function (value) {
		return (Object.prototype.toString.call(value) === "[object Array]");
	},

	type : function (value) {
		var t = /[A-Z]\w+/g.exec(Object.prototype.toString.call(value));
		return t.length ? t[0] : "Unknown";
	},

	midnightToday : function () {
		var now = new Date()
		return new Date(now.getFullYear(),now.getMonth(),now.getDate(),0,0,0,0);
	},

	// Ensure Value is a valid date.
	dateValue : function (value) {
		if (!this.isDate(value)) {
			if (typeof value === "number" && value != NaN) {
				value = new Date(this.props.value)
			} else {
				return null;
			}
		}

		return value;
	},

	daysDiff : function (start, end) {
		return Math.round((date - startDate) / (1000*60*60*24))
	},

	// dateObjects : function (obj) {
	// 	var k, v;
	// 	if (this.isArray(obj)) {
	// 		obj.forEach(this.dateObjects);
	// 	} else {
	// 		for (k in obj) {
	// 			v = obj[k];
	// 			switch(this.type(v)) {
	// 				case "Date": break;
	// 				case "String": break;
	// 				case "Object":
	// 				case "Array":
	// 				default:
	// 					this.dateObjects(v);
	// 					break;
	// 			}
	// 		}
	// 	}
	// },
	// dateStrings : function (obj) {

	// }
}

module.exports = time;