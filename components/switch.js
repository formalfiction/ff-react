/** @jsx React.DOM */


var Switch = React.createClass({displayName: 'Switch',
	propTypes : {
		enabled : React.PropTypes.bool,
		onToggle : React.PropTypes.func.isRequired,
	},

	// lifecycle
	getDefaultProps : function () {
		return {
			enabled : true,
		}
	},

	// Event Handlers
	onToggle : function (e) {
		if (typeof this.props.onToggle === "function") {
			this.props.onToggle(!this.props.enabled);
		}
	},

	// Render
	render : function () {
		var switchClassName= this.props.enabled ? "onoffswitch on" : "onoffswitch off";
		return (
			React.createElement("div", {className: "switch"}, 
				React.createElement("div", {onClick: this.onToggle, onTouchEnd: this.onToggle, className: switchClassName}, 
			    React.createElement("label", {className: "label", htmlFor: "myonoffswitch"}, 
		        React.createElement("span", {className: "inner"}), 
		        React.createElement("span", {className: "switch"})
			    )
				)
			)
		);
	}
});

module.exports = Switch