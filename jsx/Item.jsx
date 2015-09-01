/** @jsx React.DOM */
var React = require('React');


// A placeholder Item
var Item = React.createClass({
	render : function () {
		var title = this.props.data;
		if (typeof title === "object") {
			title = this.props.data.name || this.props.data.title;
		}
		
		return (
			<div {...this.props} className="item">
				<p>{title}</p>
			</div>
		);
	}
});

module.exports = Item;