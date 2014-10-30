/** @jsx React.DOM */

/*
 * Straight Markdown renderer
 * No Editing
 */

var Showdown = require('../deps/Showdown');

var MarkdownText = React.createClass({displayName: 'MarkdownText',
	propTypes : {
		// The Markdown to render
		value : React.PropTypes.string.isRequired
	},

	// Render
	render : function () {
		var value = this.props.value || ""
			, converter = new Showdown.converter()
			, rawMarkup = converter.makeHtml(value);
		
		return (
			React.DOM.div({className: "markdownText", dangerouslySetInnerHTML: { __html : rawMarkup}}
			)
		);
	}
});

module.exports = MarkdownText;