var assert = require("assert")
	, tu = require('./testUtils');

var time = require('../../utils/time');

// define some basic dates to work with
var apr4At530 = new Date("Sat Apr 04 2015 17:30:00 GMT-0400 (EDT)")
	, apr4At630 = new Date("Sat Apr 04 2015 18:30:00 GMT-0400 (EDT)");

describe("Time Utils", function () {

	it('isDate', function (){
		tu.assertType(time.isDate, 'function');
		var cases = [
			[new Date(), true],
			['date', false],
			// [new Date('invalid daterino'), false]
		];

		// cases.forEach(function(c){
		// 	assert.equal(time.isDate(c[0]),c[1]);
		// });
	});

	it('timeRangeString', function(){
		tu.assertType(time.timeRangeString, 'function');

		var cases = [
			[apr4At530, apr4At630, "5:30pm - 6:30pm"],
		];

		cases.forEach(function(c){
			assert.equal(time.timeRangeString(c[0],c[1]),c[2]);
		});
	});

	it('validDate', function(){
		tu.assertType(time.validDate, 'function');

		var now = new Date();
		var cases = [
			[now, now],
			// ['date', false],
			// [new Date('invalid daterino'), false]
		];

		cases.forEach(function(c){
			assert.equal(time.validDate(c[0]),c[1]);
		});
	});

	it('midnightToday',function (){
		tu.assertType(time.midnightToday, 'function');
		var today = time.midnightToday();
		assert.equal(today.getYear(), new Date().getYear());
		assert.equal(today.getMonth(), new Date().getMonth());
		assert.equal(today.getDate(), new Date().getDate());
		assert.equal(today.getHours(), 0);
		assert.equal(today.getMinutes(), 0);
		assert.equal(today.getSeconds(), 0);
		assert.equal(today.getMilliseconds(), 0);
	});

	it('daysDiff', function(){
		tu.assertType(time.daysDiff, 'function');
		
		var now = new Date()
			, tomorrow = new Date(now.valueOf() + (3600000 * 24));

		var cases = [
			[now, now, 0],
			[now, tomorrow, 1]
		];

		cases.forEach(function(c){
			assert.equal(time.daysDiff(c[0],c[1]),c[2]);
		});
	});

	it('hourDuration', function () {
		tu.assertType(time.hourDuration, 'function');
		var now = new Date()
			, halfHr = new Date(now.valueOf() + 1800000)
			, oneHr = new Date(now.valueOf() + 3600000)
			, twoHr = new Date(now.valueOf() + (3600000 * 2));

		var cases = [
			[now, now, 0],
			[now, halfHr, 0.5],
			[now, oneHr, 1],
			[now, twoHr, 2]
		]

		cases.forEach(function(c){
			assert.equal(time.hourDuration(c[0],c[1]),c[2]);
		});
	});

	it('shiftDate', function(){
		tu.assertType(time.shiftDate, 'function');

		var cases = [
			[0,0,0,new Date()]
		];

		cases.forEach(function(c){
			var d = time.shiftDate(c[0],c[1],c[2])
				, o = c[3];
			assert.equal(d.getHours(), o.getHours());
			assert.equal(d.getMinutes(), o.getMinutes());
			assert.equal(d.getSeconds(), o.getSeconds());
		});
	});

	describe("Date-to-Strings", function(){
		it('dateTimeString', function(){
			tu.assertType(time.dateTimeString, 'function');
			var cases = {
				"Apr. 4 4:32 pm" : new Date("Sat Apr 04 2015 16:32:27 GMT-0400 (EDT)"),
			}

			for (var result in cases) {
				var test = cases[result]
				assert.equal(time.dateTimeString(test), result);
			}
		});
		it('timeString', function(){
			tu.assertType(time.timeString, 'function');
			
			var cases = [
				[new Date("Sat Apr 04 2015 17:00:00 GMT-0400 (EDT)"), "5:00pm"],
			];

			cases.forEach(function(c){
				assert.equal(time.timeString(c[0]), c[1]);
			});
		});
		it('shortDateString', function(){
			tu.assertType(time.shortDateString, 'function');
			var cases = {
				"Apr. 4" : new Date("Sat Apr 04 2015 16:32:27 GMT-0400 (EDT)"),
			}
			for (var result in cases) {
				var test = cases[result]
				assert.equal(time.shortDateString(test), result);
			}
		});
		it('past', function(){
			var cases = {
				"just now" : new Date(),
				"1 minute ago" : time.shiftDate(-1,0,0),
				"25 minutes ago" : time.shiftDate(-25,0,0),
				"1 hour ago" : time.shiftDate(0,-1,0),
				"4 hours ago" : time.shiftDate(0,-4,0),
			}

			for (var expect in cases ) {
				var val = cases[expect];
				assert.equal(expect, time.relativeDateString(val));
			}

		});
		it('future', function(){
			var cases = {
				"just now" : new Date(),
				"in 1 minute" : time.shiftDate(1,0,0),
				"in 25 minutes" : time.shiftDate(25,0,0),
				"in 1 hour" : time.shiftDate(1,1,0),
				"in 4 hours" : time.shiftDate(0,4,0),
			}

			for (var expect in cases ) {
				var val = cases[expect];
				assert.equal(expect, time.relativeDateString(val));
			}
		});
	});
});

