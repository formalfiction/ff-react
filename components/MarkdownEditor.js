/** @jsx React.DOM */

var Showdown = require('../deps/Showdown');

var MarkdownEditor = React.createClass({displayName: 'MarkdownEditor',
	getInitialState : function () {
		return {
			previewing : false
		}
	},
	togglePreview : function (e) {
		e.preventDefault();
		this.setState({ previewing : !this.state.previewing });
		return false;
	},
	handleChange : function (e) {
		e.preventDefault();
		if (typeof this.props.onChange === "function") {
			this.props.onChange(this.props.key, this.refs["editor"].getDOMNode().value);
		}
		return false;
	},
	submit : function (e) {
		e.preventDefault();
		if (typeof this.props.onSubmit() === "function") {
			this.props.onSubmit();
		}
		return false;
	},
	render : function () {
		var editor
			, value = this.props.value || ""

		var header = React.DOM.header(null, 
									React.DOM.a( {className:"ss-icon right", onClick:this.togglePreview, onTouchEnd:this.togglePreview}, "view")
								 )

		if (this.state.previewing) {
			var converter = new Showdown.converter()
				, rawMarkup = converter.makeHtml(value.toString());

			editor = React.DOM.div( {className:"markdownEditor"}, 
				header,
				React.DOM.span( {dangerouslySetInnerHTML:{ __html : rawMarkup}})
			)

		} else {
			editor = React.DOM.div( {className:"markdownEditor", onSubmit:this.handleSubmit}, 
				header,
				React.DOM.textarea( {ref:"editor", value:value, onChange:this.handleChange})
			)
		}

		return editor;
	}
});

module.exports = MarkdownEditor;