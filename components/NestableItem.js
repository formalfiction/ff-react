/** @jsx React.DOM */


// A placeholder Nestable Item
var NestableItem = React.createClass({displayName: "NestableItem",
	render : function () {
		var items, data = this.props.data
		if (data.data) {
			items = React.createElement("div", {className: "list"}, 
								
									data.data.map(function(d,i){
										return React.createElement(NestableItem, React.__spread({},  this.props, {"data-list": this.props.index, "data-index": i, key: this.props.index + "." + i, data: d}))
									}, this)
								
							)
		};

		return (
			React.createElement("div", React.__spread({},  this.props, {className: "item"}), 
				React.createElement("p", null, this.props.data.name), 
				items
			)
		);
	}
});

module.exports = NestableItem;