/** @jsx React.DOM */
var React = require('React');

/* CronInput takes a human-readable string input & tries to
 * create a cron pattern from it.
 * Leverages cronizer module to do the heavy lifting of cron
 * interpretation
 */

var cronizer = require('cronizer');

var CronInput = React.createClass({
	propTypes : {
		// name this thing.
		name : React.PropTypes.string.isRequired,

		// className will set on the containing div
		className : React.PropTypes.string,
		// enable / disable the field
		disabled : React.PropTypes.bool,
		// onChange : React.PropTypes.func,
		onValueChange : React.PropTypes.func,
		// placeholder text
		placeholder : React.PropTypes.string,
		showPattern : React.PropTypes.bool,
		// leave undefined to display no validation
		valid : React.PropTypes.bool,
		// an object in the form:
		// { input : *input string*, pattern : *cron pattern* }
		value : React.PropTypes.object,
	},

	// lifecycle
	getDefaultProps : function () {
		return {
			className : "cronInput",
			placeholder : "eg. Every Other Tuesday",
			showPattern : false,
			value : { input : "", pattern : undefined }
		}
	},

	// Event Handlers
	onChange : function (e) {

		if (typeof this.props.onValueChange === "function") {
			this.props.onValueChange({ input : e.value,  });
		}
	},
	onFocus : function (e) {

	},
	onBlur : function (e) {

	},

	// render
	validation : function () {
		var valid = "";

		return valid;
	},
	pattern : function () {
		if (this.props.showPattern) {
			return (
				<div className="pattern">this.props.value.pattern</div>
			);
		}
		
		return;
	},
	render : function () {
		var input = this.props.value.input
			, pattern = this.props.value.pattern;

		return (
			<div className={this.props.className}>
				<input ref="input" 
							 type="text"
							 disabled={this.props.disabled}
							 onChange={this.onChange}
							 onFocus={this.onFocus}
							 onBlur={this.onBlur} />
				<div className="ss-icon">{this.validation()}</div>
				this.pattern()
			</div>
		);
	}
});

module.exports = CronInput;