import { Component, PropTypes } from 'react';
import Showdown from '../deps/Showdown';

class MarkdownEditor extends Component{
	static propTypes = {
		name : PropTypes.string.isRequired,
		// Change handler in the form (value, name)
		onValueChange : PropTypes.func.isRequired,
		value : PropTypes.string.isRequired,
	},
	state = {
		previewing : false
	}

	// handlers
	onTogglePreview = (e) => {
		e.preventDefault();
		this.setState({ previewing : !this.state.previewing });
		return false;
	}
	onChange = (e) => {
		e.preventDefault();
		if (typeof this.props.onChange === "function") {
			this.props.onChange(this.props.name, this.refs["editor"].getDOMNode().value);
		}
		if (typeof this.props.onValueChange === "function") {
			this.props.onValueChange(this.refs["editor"].getDOMNode().value, this.props.name);
		}
		return false;
	}
	onSubmit = (e) => {
		e.preventDefault();
		if (typeof this.props.onSubmit() === "function") {
			this.props.onSubmit();
		}
		return false;
	}

	// Render
	render() {
		var editor
			, value = this.props.value || ""

		var header = <header>
									<a className="ss-icon right" onClick={this.onTogglePreview} onTouchEnd={this.onTogglePreview}>view</a>
								 </header>

		if (this.state.previewing) {
			var converter = new Showdown.converter()
				, rawMarkup = converter.makeHtml(value.toString());

			editor = <div className="markdownEditor">
				{header}
				<span dangerouslySetInnerHTML={{ __html : rawMarkup}}></span>
			</div>

		} else {
			editor = <div className="markdownEditor" onSubmit={this.onSubmit}>
				{header}
				<textarea ref="editor" value={value} onChange={this.onChange}></textarea>
			</div>
		}

		return editor;
	}
}

export default MarkdownEditor;