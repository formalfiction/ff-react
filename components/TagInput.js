import { Component, PropTypes } from 'react';
import KeyCodes from "../constants/KeyCodes";

/*
 *  @stateful
 *	TagInput collects tags
 */


class TagInput extends Component {
	static propTypes = {
		// be sure to include "tags" in your prop if you want
		// consistent styling
		className : PropTypes.string.isRequired,
		onValueChange : PropTypes.func,
		placeholder : PropTypes.string.isRequired,
		// numerical keyCode, defaults to comma
		separator : PropTypes.number.isRequired,
		value : PropTypes.array.isRequired,
		// set useObjects to true to pass objects instead of strings
		useObjects : PropTypes.bool.isRequired,
		// the name of the property that contains a string the tag should display
		objectNameProp : PropTypes.string,
	}
	static defaultProps = {
		separator : KeyCodes.comma,
		placeholder : "tags",
		className : "tags",
		value : [],
		useObjects : false,
		objectNameProp : "name"
	}
	state = {
		focused : false,
		selected : 0,
		input : ""
	}

	// handlers
	onFocus = (e) => {
		e.preventDefault();
		// this.refs["input"].focus();
		return false;
	}
	onKeyPress = (e) => {
		e.preventDefault();

		var v = this.props.value
			, k = e.which

		if (k === this.props.separator) {
			var val = this.state.input
			if (this.props.useObjects) {
				val = {}
				val[this.props.objectNameProp] = this.state.input;
			}
			if (typeof this.props.onValueChange === "function") {
				if (this.props.useObjects) {
					var o = {};
					o[this.props.objectNameProp] = this.state.input
					this.props.onValueChange(this.props.value.concat([o]),this.props.name);
				} else {
					this.props.onValueChange(this.props.value.concat([this.state.input]),this.props.name);
				}
			}
			this.setState({ input : "" });
		} else if (k === KeyCodes.backspace) {

		} else if (k === KeyCodes.left) {

		} else if (k === KeyCodes.right) {

		} else {
			this.setState({ input : this.state.input + String.fromCharCode(k) })
		}
		
	}

	onRemoveTag = (e) => {
		e.preventDefault();
		var i = +e.target.getAttribute('data-key')
			, v = this.props.value;

		v.splice(i,1)

		if (typeof this.props.onValueChange === "function") {
			this.props.onValueChange(v,this.props.name);
		}
		return false;
	}

	// Render
	render() {
		var self = this
			, tags = [];

		this.props.value.forEach(function(t,i){
			if (self.props.useObjects && typeof t === "object") {
				t = t[self.props.objectNameProp];
			}
			tags.push(<span key={i} className="tag">
									{t}
									<span data-key={i} className="removeTag" onClick={self.onRemoveTag} onTouchEnd={self.onRemoveTag}>x</span>
								</span>);
		});

		return (
			<div className={this.props.className}>
				{tags}
				<span contentEditable ref="input" className="input" onFocus={this.onFocus} onKeyPress={this.onKeyPress}>
					{this.state.input}
				</span>
			</div>
		);
	}
}

export default TagInput;