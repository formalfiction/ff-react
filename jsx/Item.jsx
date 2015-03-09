/** @jsx React.DOM */


// A placeholder Item
var Item = React.createElement({
	render : function () {
		return (
			<div className="item">
				<p>Item</p>
			</div>
		);
	}
});

module.exports = Item;