/** @jsx React.DOM */


/*
 * Input Hours of Operation
 * 
 */

var Hours = require('Hours');

var HoursInput = React.createClass({displayName: 'HoursInput',
	propTypes : {
		name : React.PropTypes.string,
		onValueChange : React.PropTypes.func
	},

	// lifecycle
	getDefaultProps : function () {
		return {}
	},
	getInitialState : function () {
		return {
			value : ""
		}
	},



	// render
	renderDays : function () {
		return (
			React.createElement("div", {className: "days"})
		);
	},
	render : function () {
		return (
			React.createElement("div", {className: "hoursInput"}

			)
		)
	}
});

module.exports = HoursInput;