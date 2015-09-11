import { Component, PropTypes } from 'react';

class Select extends Component {
	static propTypes = {
		// Name of the select field
		name : PropTypes.string.isRequired,
		// an array of possible options.
		// if you'd like the textual representation of the option to be different
		// from the actual value, pass an array of tuples in this form: 
		// [[value, label],[value, label], ...]
		options : PropTypes.array.isRequired,
		// Selected Value. Must be updated in external change handler
		value : PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]).isRequired,

		className : PropTypes.string,
		// Use either onChange or onValueChange, not both
		onChange : PropTypes.func,
		// onChange in the form value, name
		onValueChange : PropTypes.func
	},
	static defaultProps = {
		return {
			className : "select",
			name : "select"
		}
	}

	// LifeCycle
	state = {
		showingOptions : false,
	}

	// Event Handlers
	onToggleOptions = () => {
		this.setState({ showingOptions : !this.state.showingOptions });
	},
	onSelectOption = (e) => {
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
	formatOption(option) {
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
	}
	options = () => {
		if (!this.state.showingOptions) {
			return (
				<div className="options hidden"></div>
			);
		}

		var options = [];

		for (var i=0,opt; opt=this.props.options[i]; i++) {
			opt = this.formatOption(opt);
			options.push(<li key={i} data-value={opt[0]} onClick={this.onSelectOption}>{opt[1]}</li>)
		}

		return (
			<div className="options showing">
				<ul>
					{options}
				</ul>
			</div>
		);
	}
	render() {
		var value = this.selectedLabel(this.props.value);

		return (
			<div className={this.props.className}>
				<div className="selected" onClick={this.onToggleOptions}>{value}</div>
				{this.options()}
			</div>
		);
	}
});

export default Select;