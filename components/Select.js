/** @jsx React.DOM */

var Select = React.createClass({displayName: 'Select',
	propTypes : {
		// Name of the select field
		name : React.PropTypes.string.isRequired,
		// an array of possible options.
		// if you'd like the textual representation of the option to be different
		// from the actual value, pass an array of tuples in this form: 
		// [[value, label],[value, label], ...]
		options : React.PropTypes.array.isRequired,
		// Selected Value. Must be updated in external change handler
		value : React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.number
		]).isRequired,

		className : React.PropTypes.string,
		// Use either onChange or onValueChange, not both
		onChange : React.PropTypes.func,
		// onChange in the form value, name
		onValueChange : React.PropTypes.func
	},

	// LifeCycle
	getDefaultProps : function () {
		return {
			className : "select",
			name : "select"
		}
	},
	getInitialState : function () {
		return {
			showingOptions : false,
		}
	},

	// Event Handlers
	onToggleOptions : function () {
		this.setState({ showingOptions : !this.state.showingOptions });
	},
	onSelectOption : function (e) {
		var value = e.target.getAttribute('data-value');

		if (!isNaN(+value)) {
			value = +value;
		}

		if (typeof this.props.onChange === "function") {
			this.props.onChange(e);
		} else if (typeof this.props.onValueChange === "function") {
			this.props.onValueChange(value, this.props.name);
		}

		this.setState({ showingOptions : false });
	},


	// Render

	// takes an option & returns it's label.
	selectedLabel : function () {
		var v = this.props.value;
		if (!isNaN(+v)) {
			v = +v
		}

		for (var i=0,opt; opt=this.props.options[i]; i++) {
			opt = this.formatOption(opt);
			if (v == opt[0]) {
				return opt[1];
			}
		}

		return "select an option";
	},

	// turns option into a tuple of the form [value, label]
	formatOption : function (option) {
		switch (Object.prototype.toString.call(option)) {
			case "[object Array]":
				return option
				break;
			case "[object Object]":
				if (option.label) { return option.label; }
				else if (option.text) { return option.text; }
				break;
			default:
				return [option, option];
				break;
		}
	},
	options : function () {
		if (!this.state.showingOptions) {
			return (
				React.createElement("div", {className: "options hidden"})
			);
		}

		var options = [];

		for (var i=0,opt; opt=this.props.options[i]; i++) {
			opt = this.formatOption(opt);
			options.push(React.createElement("li", {key: i, 'data-value': opt[0], onClick: this.onSelectOption}, opt[1]))
		}

		return (
			React.createElement("div", {className: "options showing"}, 
				React.createElement("ul", null, 
					options
				)
			)
		);

	},
	render : function () {
		var value = this.selectedLabel(this.props.value);

		return (
			React.createElement("div", {className: this.props.className}, 
				React.createElement("div", {className: "selected", onClick: this.onToggleOptions}, value), 
				this.options()
			)
		);
	}
});

module.exports = Select;