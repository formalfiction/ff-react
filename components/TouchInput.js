/** @jsx React.DOM */

var mountTime;

var TouchInput = React.createClass({displayName: "TouchInput",
	propTypes : {
		// a delay (in ms) before the component will respond.
		// good for when ui is changing under a ghost click
		initialInputDelay : React.PropTypes.number,
		// gotta nam yo fields
		name : React.PropTypes.string.isRequired,
		onChange : React.PropTypes.func,
		onValueChange : React.PropTypes.func,
	},

	// Lifecycle
	getDefaultProps : function () {
		return {
			initialInputDelay : 300,
			name : "touchInput"
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
	onChange : function (e) {
		if (typeof this.props.onValueChange === "function") {
			this.props.onValueChange(e.target.value, this.props.name);
		} else if (typeof this.props.onChange === "function") {
			this.props.onChange(e);
		}
	},

	render : function () {
		return (
			React.createElement("input", React.__spread({},  this.props, {onChange: this.onChange, onMouseDown: this.onMouseDown}))
		);
	}
});

module.exports = TouchInput;