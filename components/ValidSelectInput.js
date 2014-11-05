/** @jsx React.DOM */

var ValidSelectInput = React.createClass({displayName: 'ValidSelectInput',
	propTypes : {
		// gotta name yo fields
		name : React.PropTypes.string.isRequired,
		// field value
		value : React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
		// array of potential options
		options : React.PropTypes.array,
		// use either onChange or onValueChange. Not both
		// std onChange event
		onChange : React.PropTypes.func,
		// onChange in the form of (value, name)
		onValueChange : React.PropTypes.func,
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

	// Component lifecycle methods
	getDefaultProps : function () {
		return {
			name : "",
			placeholder : "",
			options : [],
			valid : undefined,
			message : undefined,
		}
	},

	// Event Handlers
	onChange : function (e) {
		if (typeof this.props.onChange === "function") {
			this.props.onChange(e);
		}
		if (typeof this.props.onValueChange === "function") {
			this.props.onValueChange(e.target.value, this.props.name);
		}
	},

	// Render
	render : function () {
		var props = this.props
			, label
			, options = []

		if (props.label) {
			label = React.DOM.label(null, props.label)
		}

		props.options.forEach(function(opt, i){
			options.push(React.DOM.option({value: opt.value, key: i}, opt.name))
		});

		return(
			React.DOM.div({className: props.className + " valdSelectInput field"}, 
				React.DOM.select({disabled: props.disabled, type: "text", name: props.name, placeholder: props.placeholder, value: props.value, onFocus: props.onFocus, onBlur: props.onBlur, onChange: this.onChange}, 
					options
				), 
				React.DOM.span({className: "indicator ss-icon"}, props.valid ? "checked" : ((!props.valid && props.value) ? "close" : "") ), 
				React.DOM.span({className: "message"}, props.valid ? props.message : "")
			)
		);
	}
});

module.exports = ValidSelectInput;