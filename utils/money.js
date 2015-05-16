var money = {
	period : {
		second         : 1,
		minute         : 60,
		fifteenMinutes : 60 * 15,
		halfHour       : 60 * 30,
		hour           : 60 * 60,
		eightHourDay   : 60 * 60 * 8,
		day            : 60 * 60 * 24,
		week           : 60 * 60 * 24 * 7,
		month          : 60 * 60 * 24 * 30,
		quarter        : 60 * 60 * 24 * 304,
		year           : 60 * 60 * 24 * 365
	},
	periodStrings : {
		"1"        : "Sec.",
		"60"       : "Min.",
		"900"      : "15 Min.",
		"1800"     : "30 Min.",
		"3600"     : "Hr.",
		"28800"    : "Day",
		"86400"    : "Day",
		"604800"   : "Wk.",
		"2592000"  : "Mo.",
		"26265600" : "Q",
		"31536000" : "Yr."
	},
	rateCost : function (startDate, stopDate, period, cost) {
		return Math.round(Math.round((stopDate.valueOf() - startDate.valueOf()) / 1000 / period )) * cost;
	},
	rateString : function (rate, unitSize) {
		if (!rate || !unitSize) { return ""; }
		var unit = money.periodStrings[unitSize.toString()] || "";
		return unit ? money.formatCurrency(rate) + " / " + unit : money.formatCurrency(rate);
	},
	formatCurrency : function (amount) {
		if (!amount) { return "$0.00"; }
		amount = amount / 100

		var DecimalSeparator = Number("1.2").toString().substr(1,1);
		var AmountWithCommas = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		var arParts = String(AmountWithCommas).split(DecimalSeparator);
		var intPart = arParts[0];
		var decPart = (arParts.length > 1 ? arParts[1] : '');
		decPart = (decPart + '00').substr(0,2);

		return '$' + intPart + DecimalSeparator + decPart;
	},
	formatLocaleCurrency : function (amount) {
		if (!amount) { return "$0.00"; }
		amount = amount / 100

		var DecimalSeparator = Number("1.2").toLocaleString().substr(1,1);
		var AmountWithCommas = amount.toLocaleString();
		var arParts = String(AmountWithCommas).split(DecimalSeparator);
		var intPart = arParts[0];
		var decPart = (arParts.length > 1 ? arParts[1] : '');
		decPart = (decPart + '00').substr(0,2);

		return '$' + intPart + DecimalSeparator + decPart;
	}
};

module.exports = money;