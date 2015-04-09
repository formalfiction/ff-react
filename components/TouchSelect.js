/** @jsx React.DOM */


// *******
// *******
// @todo - UNFINISHED
// *******
// *******

var TouchSelect = React.createClass({displayName: "TouchSelect",
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
		this.mountTime = new Date().valueOf();
	},

	// Event Handlers
	onMouseDown : function (e) {

		if (new Date().valueOf() < (this.mountTime + this.props.initialInputDelay)) {
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
			React.createElement("select", React.__spread({},  this.props, {onMouseDown: this.onMouseDown}), options)
		);
	}
});

module.exports = TouchSelect;