/** @jsx React.DOM */
var React = require('React');

/*
 * Straight Markdown renderer
 * No Editing
 */

var Showdown = require('../deps/Showdown');

var MarkdownText = React.createClass({
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
			<div className="markdownText" dangerouslySetInnerHTML={{ __html : rawMarkup }}>
			</div>
		);
	}
});

module.exports = MarkdownText;