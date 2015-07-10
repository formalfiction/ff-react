/** @jsx React.DOM */

var Checkbox = React.createClass({
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
			name : "Checkbox"
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
			<div className="checkbox">
				<input id={"cb-" + this.props.name} name={this.props.name} type="checkbox" checked={this.props.value} onChange={this.onChange} />
				<label htmlFor={"cb-" + this.props.name}><span className="box"></span><span>{this.props.label}</span></label>
			</div>
		);
	}
});


module.exports = Checkbox;