/** @jsx React.DOM */
var React = require('React');

var ListItem = React.createClass({displayName: "ListItem",
	render : function () {
		return (
			React.createElement("div", {className: "item"}
			)
		);
	}
});

module.exports = ListItem;