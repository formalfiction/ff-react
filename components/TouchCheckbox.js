/** @jsx React.DOM */

var Checkbox = React.createClass({displayName: "Checkbox",
	propTypes : {
		label : React.PropTypes.string,
		name : React.PropTypes.string,
		onValueChange : React.PropTypes.func,
		onChange : React.PropTypes.func
	},

	// lifecycle
	getDefaultProps : function () {
		return {
			label : "",
			name : "Checkbox",
			className : ""
		}
	},

	// event handlers
	onChange : function (e) {
		var checked = e.target.checked
		if (typeof this.props.onChange === "function") {
			this.props.onChange(e);
		} else if (typeof this.props.onValueChange === "function") {
			this.props.onValueChange(checked, this.props.name);
		}
	},

	// render
	render : function () {
		return (
			React.createElement("div", {className: "checkbox " + this.props.className}, 
				React.createElement("input", {id: "cb-" + this.props.name, name: this.props.name, type: "checkbox", checked: this.props.value, onChange: this.onChange}), 
				React.createElement("label", {htmlFor: "cb-" + this.props.name}, React.createElement("span", {className: "wrap"}, React.createElement("span", {className: "box ss-icon"}, this.props.value ? "check" : "")), React.createElement("span", null, this.props.label))
			)
		);
	}
});


module.exports = Checkbox;