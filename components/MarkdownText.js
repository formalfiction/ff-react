/** @jsx React.DOM */

var Showdown = require('../deps/Showdown');

var MarkdownText = React.createClass({displayName: 'MarkdownText',
	render : function () {
		var value = this.props.value || ""
			, converter = new Showdown.converter()
			, rawMarkup = converter.makeHtml(value);
		
		return (
			React.DOM.div( {className:"markdownText", dangerouslySetInnerHTML:{ __html : rawMarkup }}
			)
		);
	}
});

module.exports = MarkdownText;