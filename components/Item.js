/** @jsx React.DOM */


// A placeholder Item
var Item = React.createClass({displayName: "Item",
	render : function () {
		var title = this.props.data;
		if (typeof title === "object") {
			title = this.props.data.name || this.props.data.title;
		}
		
		return (
			React.createElement("div", React.__spread({},  this.props, {className: "item"}), 
				React.createElement("p", null, title)
			)
		);
	}
});

module.exports = Item;