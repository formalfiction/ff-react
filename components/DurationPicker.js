/** @jsx React.DOM */

/* @stateful
 *
 * an hours & minutes picker, independant of a time amount
 * 
 */

var DurationPicker = React.createClass({displayName: 'DurationPicker',
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
			React.DOM.div( {className:"durationPicker"}
			
			)
		);
	}
});

module.exports = DurationPicker;