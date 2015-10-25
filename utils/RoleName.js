var urlNames = {
  "model" : "model",
  "booker" : "booking",
  "accountant" : "accounting",
  "manager" : "manage",
  "admin" : "admin"
};

module.exports = function (name) {
	return urlNames[name];
};