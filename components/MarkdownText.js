import { Component, PropTypes } from 'react';
import Showdown from '../deps/Showdown';

/*
 * Straight Markdown renderer
 * No Editing
 */

class MarkdownText extends Component {
	static propTypes = {
		// The Markdown to render
		value : PropTypes.string.isRequired
	}
	// render
	render() {
		var value = this.props.value || ""
			, converter = new Showdown.converter()
			, rawMarkup = converter.makeHtml(value);
		
		return (
			<div className="markdownText" dangerouslySetInnerHTML={{ __html : rawMarkup }}>
			</div>
		);
	}
}

export default MarkdownText;