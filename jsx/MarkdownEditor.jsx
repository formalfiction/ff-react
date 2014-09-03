/** @jsx React.DOM */

var Showdown = require('../deps/Showdown');

var MarkdownEditor = React.createClass({
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

		var header = <header>
					<a className="ss-icon right" onClick={this.handlePreviewClick} onTouchEnd={this.handlePreviewClick}>Preview</a>
					<a className="ss-icon submit right" onClick={this.handleSubmit} onTouchEnd={this.handleTouchEnd}>Save</a>
				</header>

		if (this.state.previewing) {
			var converter = new Showdown.converter()
				, rawMarkup = converter.makeHtml({ value.toString() });

			editor = <form className="markdownEditor">
				{header}
				<span dangerouslySetInnerHTML={{ __html : rawMarkup}}></span>
			</form>

		} else {
			editor = <form className="markdownEditor" onSubmit={this.handleSubmit}>
				{header}
				<textarea value={value} onChange={this.handleChange}></textarea>
			</div>
		}

		return editor;
	}
});

module.exports = MarkdownEditor;