/** @jsx React.DOM */


// A placeholder Item
var Item = React.createClass({
	render : function () {
		return (
			<div {...this.props} className="item">
				<p>{this.props.data}</p>
			</div>
		);
	}
});

module.exports = Item;