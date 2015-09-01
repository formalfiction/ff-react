/** @jsx React.DOM */
var React = require('React');

var BasicForm = React.createClass({displayName: "BasicForm",
	render : function () {
		return (
			React.createElement("form", null
			)
		);
	}
});

module.exports = BasicForm;