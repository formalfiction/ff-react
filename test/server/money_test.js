var assert = require("assert")
	, tu = require('./testUtils');

var money = require('../../utils/money');

describe('Money Utils', function () {

	it('rateCost', function () {
		tu.assertType(money.rateCost, 'function');
		var now = new Date()
			, tomorrow = new Date()
			, twoDays = new Date()
			, halfHour = new Date()
			, hour = new Date();

		halfHour.setMinutes(halfHour.getMinutes() + 30);
		hour.setHours(hour.getHours() + 1);
		tomorrow.setDate(tomorrow.getDate() + 1);
		twoDays.setDate(twoDays.getDate() + 2);

		var cases = [
			[now, tomorrow, money.period.day, 500, 500],
			[now, tomorrow, money.period.hour, 1, 24],
			[now, twoDays, money.period.day, 500, 1000],
			[now, twoDays, money.period.day, 500, 1000],
			[now, hour, money.period.hour, 128, 128],
			[now, hour, money.period.halfHour, 128, 256],
			[now, hour, 60 * 6, 128, 1280], // 6-minute increments, an "unsupported" number
			[now, hour, money.period.day, 128, 0],
		];

		for (var i=0,c; c=cases[i]; i++) {
			var got = money.rateCost(c[0],c[1],c[2],c[3]);
			assert.equal(got, c[4], "case: " + i + " fail. got: " + got + " expected : " + c[4]);
		}
	});
	
	it('formatCurrency', function(){
		tu.assertType(money.formatCurrency, 'function');
		
		var cases = {
			"$0.50" : 50,
			"$1.00" : 100,
			"$100.00" : 10000,
			"$2,000.00" : 200000,
			"$20,000.00" : 2000000,
			"$1,000,000.00" : 100000000
		}

		for (var outcome in cases) {
			var test = cases[outcome];
	 		assert.equal(money.formatCurrency(test), outcome);
	 	}
	});

	it('formatLocaleCurrency', function(){
		tu.assertType(money.formatCurrency, 'function');

		var cases = {
			"$0.50" : 50,
			"$1.00" : 100,
			"$100.00" : 10000,
			"$2000.00" : 200000,
			"$20000.00" : 2000000,
			"$1000000.00" : 100000000
		}

		for (var outcome in cases) {
			var test = cases[outcome];
	 		assert.equal(money.formatLocaleCurrency(test), outcome);
	 	}
	});
});

