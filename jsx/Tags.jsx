/** @jsx React.DOM */
/*
 * Tags displays a list of tags.
 * 
 */

var Tags = React.createClass({
	propTypes : {
		placeholder : React.PropTypes.string.isRequired,
		// numerical keyCode, defaults to comma
		value : React.PropTypes.array.isRequired,
		useObjects : React.PropTypes.bool.isRequired,
		objectNameProp : React.PropTypes.string,
	},

	// Lifecycle
	getDefaultProps : function () {
		return {
			placeholder : "",
			value : [],
			useObjects : false,
			objectNameProp : "name"
		}
	},

	// Render
	render : function () {
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
});

module.exports = Tags;