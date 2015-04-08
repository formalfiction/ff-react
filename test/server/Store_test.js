var assert = require('assert')
	, tu = require('./testUtils');

var Store = require('../../stores/Store')
	, timesCalled = 0
	, store;

var cbFunc = function () {
	timesCalled++;
}

describe('Store', function () {
	describe('basics', function(){
		tu.assertType(Store, 'function');

		it('new', function(){
			store = new Store({});
			tu.assertType(store, 'object');
		});

		it('extend', function (){
			tu.assertType(store.extend, 'function');
			var SubStore = Store.extend({
				addedMethod : function () {
					return "I'm new!";
				}
			});
			tu.assertType(SubStore.extend, 'function');

			var subStore = new SubStore();
			tu.assertType(subStore.addedMethod, 'function');
		});
	});

	describe('events', function(){
		it('on', function(){
			tu.assertType(store.on, 'function');
		});
		it('off', function(){
			tu.assertType(store.off, 'function');
		});
		it('emitEvent', function(){
			tu.assertType(store.emitEvent, 'function');
		});
	});

	describe('change events', function(){
		it('onChange', function(){
			tu.assertType(store.onChange,'function');
			assert.equal(store.onChange(cbFunc), 1);
		});
		it('emitChange', function(){
			assert.equal(store.emitChange("change event"),true);
			assert.equal(timesCalled, 1);
		});
		it('offChange', function(){
			tu.assertType(store.offChange,'function');
			assert.equal(store.offChange(cbFunc), 0);
		});
	});
	describe('error events', function(){
		it('onError', function(){
			tu.assertType(store.onError,'function');
			assert.equal(store.onError(cbFunc), 1);
		});
		it('emitError', function(){
			assert.equal(store.emitError("error event"),true);
			assert.equal(timesCalled, 2);
		});
		it('offError', function(){
			tu.assertType(store.offError,'function');
			assert.equal(store.offError(cbFunc), 0);
		});
	});

	describe('message events', function(){
		it('onMessage', function(){
			tu.assertType(store.onMessage,'function');
			assert.equal(store.onMessage(cbFunc), 1);
		});
		it('emitMessage', function(){
			assert.equal(store.emitMessage("message event"),true);
			assert.equal(timesCalled, 3);
		});
		it('offMessage', function(){
			tu.assertType(store.offMessage,'function');
			assert.equal(store.offMessage(cbFunc), 0);
		});
	});
});
