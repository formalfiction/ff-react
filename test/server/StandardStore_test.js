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
			tu.assertType(store.add, 'function');
			var modelsArray = [models[2],models[3]]
			var cases = [
				[{},false, 0],
				[models[0], models[0], 1],
				[models[1], models[1], 2],
				[models[1], models[1], 2],
				[modelsArray, modelsArray, 4],
			];

			cases.forEach(function(c){
				assert.equal(store.add(c[0]), c[1]);
				assert.equal(store._models.length, c[2]);
			});
		});
		describe('update', function () {
			tu.assertType(store.update, 'function');
			
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

			cases.forEach(function(c,i){
				var result = store.update(c[0])
				assert.equal(result, c[1], "case " + i + " error: " + result + " == " + c[1]);
			});
		});
		describe('remove', function(){
			tu.assertType(store.remove, 'function');
			var cases = [
				[{}, false],
				[models[2], true],
				[models[3].id, true],
				[models[3], false],
			];

			cases.forEach(function(c,i){
				var result = store.remove(c[0]);
				assert.equal(result,c[1], "case " + i + " error: " + result + " == " + c[1]);
			});

			// add models back
			store.add([models[2], models[3]]);
		});
	});

	describe('getters', function () {
		describe('one', function () {
			tu.assertType(store.one, 'function');
			var cases = [
				["not-a-known-id", undefined, undefined],
				[models[0].cid, models[0].cid, models[0].cid],
				[models[1].id, models[1].id, models[1].id],
			];

			cases.forEach(function(c,i){
				var result = store.one(c[0])
				assert.equal(c[1], c[2], "case " + i + " error: " + c[1] + " == " + c[2]);
			});
		});
		describe('all', function () {
			tu.assertType(store.all, 'function');
			var all = store.all();
			assert.equal(Object.prototype.toString.call(all), "[object Array]");
			assert.equal(all.length, models.length);
		});
	});
});