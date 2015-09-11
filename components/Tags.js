import { Component, PropTypes } from 'react';

/*
 * Tags displays a list of tags.
 * 
 */

class Tags extends Component {
	static propTypes = {
		placeholder : PropTypes.string.isRequired,
		// numerical keyCode, defaults to comma
		value : PropTypes.array.isRequired,
		useObjects : PropTypes.bool.isRequired,
		objectNameProp : PropTypes.string,
	}
	static defaultProps = {
		placeholder : "",
		value : [],
		useObjects : false,
		objectNameProp : "name"
	}

	// Render
	render() {
		var self = this
			, tags = [];

		this.props.value.forEach(function(t,i){
			if (self.props.useObjects) {
				t = t[self.props.objectNameProp];
			}
			tags.push(<span key={i} className="tag">{t}</span>);
		});

		return (
			<div className="tags">
				{tags}
			</div>
		);
	}
}

export default Tags;