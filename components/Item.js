/** @jsx React.DOM */


// A placeholder Item
var Item = React.createClass({displayName: "Item",
	render : function () {
		return (
			React.createElement("div", React.__spread({},  this.props, {className: "item"}), 
				React.createElement("p", null, this.props.data)
			)
		);
	}
});

module.exports = Item;