/** @jsx React.DOM */


// A placeholder Item
var Item = React.createElement({
	render : function () {
		return (
			React.createElement("div", {className: "item"}, 
				React.createElement("p", null, "Item")
			)
		);
	}
});

module.exports = Item;