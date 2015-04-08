var assert = require('assert')
	, _ = require('underscore');

module.exports = {
	assertType : function assertType (obj, type) {
		return it('should be a ' + type, function(){
			assert.equal(typeof obj, type);
		});
	},
	runCases : function runCases (fn, cases, context) {
		// make sure fn is in fact a function
		this.assertType(fn, 'function');

		cases.forEach(function(args,i){
			var expect = args.pop()
				, result = fn.apply(context, args);

			if (_.isFunction(expect)) {
				assert.ok(expect(result), "case " + i + " failed truth test");
			} else if (_.isObject(expect)) {
				assert.ok(_.isEqual(expect, result), "case " + i + " fail: " + result + " == " + expect);
			} else {
				assert.equal(result, expect, "case " + i + " fail: " + result + " == " + expect );
			}
		});
	},
};