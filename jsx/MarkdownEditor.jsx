/** @jsx React.DOM */

var Showdown = require('../deps/Showdown');

var MarkdownEditor = React.createClass({
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

		var header = <header>
					<a className="ss-icon right" onClick={this.togglePreview} onTouchEnd={this.togglePreview}>view</a>
				</header>

		if (this.state.previewing) {
			var converter = new Showdown.converter()
				, rawMarkup = converter.makeHtml(value.toString());

			editor = <div className="markdownEditor">
				{header}
				<span dangerouslySetInnerHTML={{ __html : rawMarkup}}></span>
			</div>

		} else {
			editor = <div className="markdownEditor" onSubmit={this.handleSubmit}>
				{header}
				<textarea ref="editor" value={value} onChange={this.handleChange}></textarea>
			</div>
		}

		return editor;
	}
});

module.exports = MarkdownEditor;