var assert = require("assert")
	, tu = require('./testUtils');

var money = require('../../utils/money');

describe('Money Utils', function () {
	
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

