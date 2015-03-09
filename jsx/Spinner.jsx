/** @jsx React.DOM */

// A simple Spinner

var Spinner = React.createClass({
	propTypes : {
		// none
	},

	// Render
	render : function () {
		return (
			<div className="spinner">
				<div className="bounce1"></div>
				<div className="bounce2"></div>
				<div className="bounce3"></div>
			</div>
		);
	}
});

module.exports = Spinner;