/** @jsx React.DOM */

var Showdown = require('../deps/Showdown');

var MarkdownText = React.createClass({
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