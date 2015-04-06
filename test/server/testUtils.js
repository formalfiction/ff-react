var assert = require('assert');

module.exports = {
	assertType : function assertType (obj, type) {
		return it('should be a ' + type, function(){
			assert.equal(typeof obj, type);
		});
	}
};