import React, { Component, PropTypes } from 'react';

class Checkbox extends Component {
	static propTypes = {
		label : PropTypes.string,
		name : PropTypes.string,
		onValueChange : PropTypes.func,
		onChange : PropTypes.func
	}
	static defaultProps = {
		label : "",
		name : "Checkbox",
		className : ""
	}

	// handlers
	onChange = (e) => {
		var checked = e.target.checked
		if (typeof this.props.onChange === "function") {
			this.props.onChange(e);
		} else if (typeof this.props.onValueChange === "function") {
			this.props.onValueChange(checked, this.props.name);
		}
	}

	// render
	render() {
		return (
			<div className={"checkbox " + this.props.className}>
				<input id={"cb-" + this.props.name} name={this.props.name} type="checkbox" checked={this.props.value} onChange={this.onChange} />
				<label htmlFor={"cb-" + this.props.name}><span className="wrap"><span className="box ss-icon">{this.props.value ? "check" : ""}</span></span><span>{this.props.label}</span></label>
			</div>
		);
	}
}


export default Checkbox;