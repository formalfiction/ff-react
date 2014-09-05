/** @jsx React.DOM */

var Showdown = require('../deps/Showdown');

var MarkdownEditor = React.createClass({displayName: 'MarkdownEditor',
	setInitialState : function () {
		return {
			previewing : false
		}
	},
	handlePreviewClick : function (e) {
		e.preventDefault();
		this.setState({ previewing : !this.state.previewing });
		return false;
	},
	handleChange : function (e) {
		e.preventDefault();
		if (typeof this.props.onChange === "function") {
			this.props.onChange();
		}
		return false;
	},
	handleSubmit : function (e) {
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
					React.DOM.a( {className:"ss-icon right", onClick:this.handlePreviewClick, onTouchEnd:this.handlePreviewClick}, "Preview"),
					React.DOM.a( {className:"ss-icon submit right", onClick:this.handleSubmit, onTouchEnd:this.handleTouchEnd}, "Save")
				)

		if (this.state.previewing) {
			var converter = new Showdown.converter()
				, rawMarkup = converter.makeHtml(value.toString());

			editor = React.DOM.form( {className:"markdownEditor"}, 
				header,
				React.DOM.span( {dangerouslySetInnerHTML:{ __html : rawMarkup}})
			)

		} else {
			editor = React.DOM.form( {className:"markdownEditor", onSubmit:this.handleSubmit}, 
				header,
				React.DOM.textarea( {value:value, onChange:this.handleChange})
			)
		}

		return editor;
	}
});

module.exports = MarkdownEditor;