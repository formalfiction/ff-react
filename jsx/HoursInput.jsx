/** @jsx React.DOM */


/*
 * Input Hours of Operation
 * 
 */

var Hours = require('Hours');

var HoursInput = React.createClass({
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
			<div className="days"></div>
		);
	},
	render : function () {
		return (
			<div className="hoursInput">

			</div>
		)
	}
});

module.exports = HoursInput;