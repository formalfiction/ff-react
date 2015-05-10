/** @jsx React.DOM */

// A simple Spinner

var Spinner = React.createClass({displayName: 'Spinner',
	propTypes : {
		// none
	},

	// Render
	render : function () {
		return (
			React.createElement("div", {className: "spinner"}, 
				React.createElement("div", {className: "bounce1"}), 
				React.createElement("div", {className: "bounce2"}), 
				React.createElement("div", {className: "bounce3"})
			)
		);
	}
});

module.exports = Spinner;