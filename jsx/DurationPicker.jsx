/** @jsx React.DOM */

/* @stateful
 *
 * an hours & minutes picker, independant of a time amount
 * 
 */

var DurationPicker = React.createClass({
	propTypes : {
		unixTime : React.PropTypes.bool.isRequired,
		onChange : React.PropTypes.func,
		onValueChange : React.PropTypes.func
	},

	// Lifecycle
	getDefaultProps : function () {
		return {
			unixTime : true
		}
	},

	render : function () {
		return (
			<div className="durationPicker">
			
			</div>
		);
	}
});

module.exports = DurationPicker;