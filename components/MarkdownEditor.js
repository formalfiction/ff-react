/** @jsx React.DOM */

var Showdown = require('../deps/Showdown');

var MarkdownEditor = React.createClass({displayName: 'MarkdownEditor',
	propTypes : {
		name : React.PropTypes.string.isRequired,
		// Change handler in the form (value, name)
		onValueChange : React.PropTypes.func.isRequired,
		value : React.PropTypes.string.isRequired,
	},

	// Component lifecycle methods
	getInitialState : function () {
		return {
			previewing : false
		}
	},

	// Event Handlers
	onTogglePreview : function (e) {
		e.preventDefault();
		this.setState({ previewing : !this.state.previewing });
		return false;
	},
	onChange : function (e) {
		e.preventDefault();
		if (typeof this.props.onChange === "function") {
			this.props.onChange(this.props.name, this.refs["editor"].getDOMNode().value);
		}
		if (typeof this.props.onValueChange === "function") {
			this.props.onValueChange(this.refs["editor"].getDOMNode().value, this.props.name);
		}
		return false;
	},
	onSubmit : function (e) {
		e.preventDefault();
		if (typeof this.props.onSubmit() === "function") {
			this.props.onSubmit();
		}
		return false;
	},

	// Render
	render : function () {
		var editor
			, value = this.props.value || ""

		var header = React.DOM.header(null, 
									React.DOM.a( {className:"ss-icon right", onClick:this.onTogglePreview, onTouchEnd:this.onTogglePreview}, "view")
								 )

		if (this.state.previewing) {
			var converter = new Showdown.converter()
				, rawMarkup = converter.makeHtml(value.toString());

			editor = React.DOM.div( {className:"markdownEditor"}, 
				header,
				React.DOM.span( {dangerouslySetInnerHTML:{ __html : rawMarkup}})
			)

		} else {
			editor = React.DOM.div( {className:"markdownEditor", onSubmit:this.onSubmit}, 
				header,
				React.DOM.textarea( {ref:"editor", value:value, onChange:this.onChange})
			)
		}

		return editor;
	}
});

module.exports = MarkdownEditor;