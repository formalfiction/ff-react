/** @jsx React.DOM */

var ValidTextInput = React.createClass({
	propTypes : {
		// gotta name yo fields
		name : React.PropTypes.string.isRequired,
		// field value
		value : React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
		// std onChange event
		onChange : React.PropTypes.func,
		// placeholder text
		placeholder : React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.number]),
		// leave undefined to display no valid
		valid : React.PropTypes.bool,
		// leave undefined to display no message
		message : React.PropTypes.string,
		// enable / disable the field
		disabled : React.PropTypes.bool,
		// className will set on the containing div
		className : React.PropTypes.string
	},
	getDefaultProps : function () {
		return {
			name : "",
			placeholder : "",
			valid : undefined,
			message : undefined,
		}
	},
	render : function () {
		var props = this.props
			, label;

		return(
			<div className={props.className + " validTextInput field"}>
				<input disabled={props.disabled} type="text" name={props.name} onFocus={props.onFocus} onBlur={props.onBlur} onChange={self.handleChange} placeholder={props.placeholder} value={props.value} />
				<span className="indicator ss-icon">{props.valid ? "checked" : ((!props.valid && props.value) ? "close" : "") }</span>
				<span className="message">{props.valid ? props.message : "" }</span>
			</div>
		);
	}
});

module.exports = ValidTextInput;