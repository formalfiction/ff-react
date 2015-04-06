var assert = require('assert')
	, tu = require('./testUtils')
	, timesCalled = 0
	, action = {
			actionType : "TEST_ACTION"
		};

function callback (payload) {
	var action = payload.action;
	assert.equal(action.actionType, "TEST_ACTION");
	timesCalled++;
	if (action.test) { action.test(); }
	if (action.done) { action.done(); }
}

function failCallback(payload) {
	return new Error('huh');
}

var Dispatcher = require('../../dispatcher/Dispatcher')
	, dispatcher = new Dispatcher();

describe('Dispatcher', function () {
	it('register', function(){
		tu.assertType(dispatcher.register, 'function');
		assert.equal(dispatcher.register(failCallback), 0);
		assert.equal(dispatcher.register(callback), 1);
	});

	it('handle view action', function(done){
		tu.assertType(dispatcher.handleViewAction, 'function');
		action.done = done;
		action.test = function () {
			assert.equal(timesCalled, 1);
		}
		dispatcher.handleViewAction(action);
	});

	// @todo - mock ajax requests.
	it('handle server action', function (done) {
		tu.assertType(dispatcher.handleServerAction, 'function');
		// action.done = done;
		// action.test = function () {
		// 	assert.equal(timesCalled, 2);
		// }
		// dispatcher.handleServerAction(action);
		done();
	});

	it('waitFor', function(){
		tu.assertType(dispatcher.waitFor, 'function');
	});

});