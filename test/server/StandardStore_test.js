var assert = require('assert')
	, tu = require('./testUtils');

var StandardStore = require('../../Stores/StandardStore')
	, store = new StandardStore();

var models = [
	{ cid : "client-id-one", name : "allen", age : 17 },
	{ id : "rNv4143567890", name : "jamelle", age : 14 },
	{ id : "aDv1234567890", name : "manuel", age : 5 },
	{ id : "zFv2003567890", name : "carmella", age : 45 }
];

describe('StandardStore', function(){

	describe('setters', function () {
		describe('valid', function () {
			tu.assertType(store.valid, 'function');
			var cases = [
				["", false],
				["", false, ["model must be an object"]],
				[{}, false],
				[{}, false, ["model must have an id or cid property"]],
				[{ id : "123"}, true],
				[{ id : "123"}, true, []],
			];

			cases.forEach(function(c,i){
				if (c.length === 2) {
					var result = store.valid(c[0]);
					assert.equal(result, c[1], "case " + i + " error: " + result + " == " + c[1]);
				} else {
					var result = store.valid(c[0], function(errors){
						errors.forEach(function(e,i){
							assert.equal(e,c[2][i]);
						});
					});
					assert.equal(result, c[1], "case " + i + " error: " + result + " == " + c[1]);
				}
			});
		});
		describe('add', function () {
			var modelsArray = [models[2],models[3]]
			var cases = [
				[{}, function(m){ return (m === false) }],
				[models[0], function(){ return (store.all().length === 1) }],
				[models[1], function(){ return (store.all().length === 2) }],
				[models[1], function(){ return (store.all().length === 2) }],
				[modelsArray, function(){ return (store.all().length === 4) }],
			];

			tu.runCases(store.add, cases, store);
		});
		describe('update', function () {
			models[0].goal = "win world series";
			models[1].goal = "build lego castle";
			models[2].goal = "meet martha stewart";
			models[3].goal = "sail the seven seas";

			var cases = [
				[models[0], true],
				[models[1], true],
				[models[2], true],
				[models[3], true],
				[{}, false]
			];

			tu.runCases(store.update, cases, store);
		});
		describe('remove', function(){
			var cases = [
				[undefined, false],
				[{}, false],
				[models[2], true],
				[models[3].id, true],
				[models[3], false],
			];

			tu.runCases(store.remove, cases, store);

			// add models back
			store.add([models[2], models[3]]);
		});
	});

	describe('getters', function () {
		describe('one', function () {
			var cases = [
				[undefined, undefined],
				["", undefined],
				["not-a-known-id", undefined],
				[models[0].cid, models[0]],
				[models[1].id, models[1]],
			];

			tu.runCases(store.one, cases, store);
		});
		describe('all', function () {
			tu.assertType(store.all, 'function');
			var all = store.all();
			assert.equal(Object.prototype.toString.call(all), "[object Array]");
			assert.equal(all.length, models.length);
		});
	});

	describe('reference errors', function(){
		it('shouldn\'t share _models between stores', function(){
			var StoreOne = StandardStore.extend()
				, StoreTwo = StandardStore.extend();
			
			var storeOne = new StoreOne()
				, storeTwo = new StoreTwo();
			
			storeOne.add({ id : "abc", name : "store one model" });
			assert.equal(storeTwo.all().length, 0);
		});
	});
});