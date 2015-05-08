/** @jsx React.DOM */

var TouchInput = React.createClass({
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
			initialInputDelay : 450,
			name : "touchInput"
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
	onChange : function (e) {
		if (typeof this.props.onValueChange === "function") {
			this.props.onValueChange(e.target.value, this.props.name);
		} else if (typeof this.props.onChange === "function") {
			this.props.onChange(e);
		}
	},

	render : function () {
		return (
			<input {...this.props} onChange={this.onChange} onMouseDown={this.onMouseDown} />
		);
	}
});

module.exports = TouchInput;