/** @jsx React.DOM */

var mountTime;

var TouchInput = React.createClass({
	propTypes : {
		// a delay (in ms) before the component will respond.
		// good for when ui is changing under a ghost click
		initialInputDelay : React.PropTypes.number
	},

	// Lifecycle
	getDefaultProps : function () {
		return {
			initialInputDelay : 300
		}
	},
	componentDidMount : function () {
		mountTime = new Date();
	},

	// Event Handlers
	onMouseDown : function (e) {

		if (new Date().valueOf() < (mountTime.valueOf() + this.props.initialInputDelay)) {
			e.preventDefault();
			e.stopPropagation();
			return;
		}

		if (typeof this.props.onMouseDown === "function") {
			this.props.onMouseDown(e);
		}
	},

	render : function () {
		return (
			<input {...this.props} onMouseDown={this.onMouseDown} />
		);
	}
});

module.exports = TouchInput;