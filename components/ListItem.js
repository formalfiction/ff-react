/** @jsx React.DOM */

var ListItem = React.createClass({displayName: 'ListItem',
	render : function () {
		return (
			React.createElement("div", {className: "item"}
			)
		);
	}
});

module.exports = ListItem;