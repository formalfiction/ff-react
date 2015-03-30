var money = {
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