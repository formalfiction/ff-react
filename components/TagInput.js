/** @jsx React.DOM */
/*
 *  @stateful
 *	TagInput collects tags
 */

var KeyCodes = require("../constants/KeyCodes");

var TagInput = React.createClass({displayName: 'TagInput',
	propTypes : {
		// Use either onChange or onValueChange
		onChange : React.PropTypes.func,
		onValueChange : React.PropTypes.func,
		placeholder : React.PropTypes.string.isRequired,
		// numerical keyCode, defaults to comma
		separator : React.PropTypes.number.isRequired,
		value : React.PropTypes.array.isRequired,
	},

	// Lifecycle
	getDefaultProps : function () {
		return {
			separator : KeyCodes.comma,
			placeholder : "tags",
			value : [],
		}
	},
	getInitialState : function () {
		return {
			focused : false,
			selected : 0,
			input : "x"
		}
	},

	// Event Handlers
	onFocus : function (e) {
		e.preventDefault();
		// this.refs["input"].focus();
		return false;
	},
	onKeyPress : function (e) {
		var v = this.props.value
			, k = e.which

		if (k === KeyCodes.comma) {

		} else if (k === KeyCodes.backspace) {

		} else if (k === KeyCodes.left) {

		} else if (k === KeyCodes.right) {

		} else {
			this.setState({ input : this.state.input + String.fromCharCode(k) })
		}
		
		if (typeof this.props.onChange === "function") {

		}
		if (typeof this.props.onValueChange === "function") {

		}
	},

	onRemoveTag : function (e) {
		e.preventDefault();
		return false;
	},

	// Render
	render : function () {
		var tags = [];

		this.props.value.forEach(function(t,i){
			tags.push(React.DOM.span( {key:i, className:"tag"}, 
									t,
									React.DOM.a( {href:"", onClick:this.onRemoveTag, onTouchEnd:this.onRemoveTag}, "x")
								));
		});

		return (
			React.DOM.div( {className:"tags", contentEditable:true, onFocus:this.onFocus, onKeyPress:this.onKeyPress}, 
				tags,
				React.DOM.span( {ref:"input", className:"input"}, 
					this.state.input
				)
			)
		);
	}
});

module.exports = TagInput;