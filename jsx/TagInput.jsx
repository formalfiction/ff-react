/** @jsx React.DOM */
/*
 *  @stateful
 *	TagInput collects tags
 */

var KeyCodes = require("../constants/KeyCodes");

var TagInput = React.createClass({
	propTypes : {
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
			input : ""
		}
	},

	// Event Handlers
	onFocus : function (e) {
		e.preventDefault();
		// this.refs["input"].focus();
		return false;
	},
	onKeyPress : function (e) {
		e.preventDefault();

		var v = this.props.value
			, k = e.which

		if (k === KeyCodes.comma) {
			this.setState({ input : "" });

			if (typeof this.props.onValueChange === "function") {
				this.props.onValueChange(this.props.value.concat([this.state.input]),this.props.name);
			}
		} else if (k === KeyCodes.backspace) {

		} else if (k === KeyCodes.left) {

		} else if (k === KeyCodes.right) {

		} else {
			this.setState({ input : this.state.input + String.fromCharCode(k) })
		}
		
	},

	onRemoveTag : function (e) {
		e.preventDefault();
		var i = +e.target.getAttribute('data-key')
			, v = this.props.value;

		v.splice(i,1)

		if (typeof this.props.onValueChange === "function") {
			this.props.onValueChange(v,this.props.name);
		}
		return false;
	},

	// Render
	render : function () {
		var self = this
			, tags = [];

		this.props.value.forEach(function(t,i){
			tags.push(<span key={i} className="tag">
									{t}
									<span data-key={i} className="removeTag" onClick={self.onRemoveTag} onTouchEnd={self.onRemoveTag}>x</span>
								</span>);
		});

		return (
			<div className="tags">
				{tags}
				<span contentEditable ref="input" className="input" onFocus={this.onFocus} onKeyPress={this.onKeyPress}>
					{this.state.input}
				</span>
			</div>
		);
	}
});

module.exports = TagInput;