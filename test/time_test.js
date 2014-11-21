var assert = require("assert");

var time = require('../utils/time');

function shiftDate (minutes, hours, days) {
	var n = new Date()
	n.setMinutes(n.getMinutes()+minutes);
	n.setHours(n.getHours()+hours);
	n.setDate(n.getDate()+days);
	return n;
}

describe("Time Utils", function () {
	describe("Date Strings", function() {
		it('')
	});

	describe("Relative Date Strings", function(){
		it('past', function(){
			var cases = {
				"just now" : new Date(),
				"1 minute ago" : shiftDate(-1,0,0),
				"25 minutes ago" : shiftDate(-25,0,0),
				"1 hour ago" : shiftDate(0,-1,0),
				"4 hours ago" : shiftDate(0,-4,0),
			}

			for (var expect in cases ) {
				var val = cases[expect];
				assert.equal(expect, time.relativeDateString(val));
			}

		});
		it('future', function(){
			var cases = {
				"just now" : new Date(),
				"in 1 minute" : shiftDate(1,0,0),
				"in 25 minutes" : shiftDate(25,0,0),
				"in 1 hour" : shiftDate(1,1,0),
				"in 4 hours" : shiftDate(0,4,0),
			}

			for (var expect in cases ) {
				var val = cases[expect];
				assert.equal(expect, time.relativeDateString(val));
			}
		});
	});
});

