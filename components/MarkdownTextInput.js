/** @jsx React.DOM */

var MarkdownTextInput = React.createClass({displayName: 'MarkdownTextInput',
	render : function () {
		return (
			React.DOM.textarea(null)
		);
	}
});

module.exports = MarkdownTextInput;