/** @jsx React.DOM */


// A placeholder Nestable Item
var NestableItem = React.createClass({
	render : function () {
		var items, data = this.props.data
		if (data.data) {
			items = <div className="list">
								{
									data.data.map(function(d,i){
										return <NestableItem {...this.props} data-index={i} key={this.props.index + "." + i} data={d} />
									}, this)
								}
							</div>
		};

		return (
			<div {...this.props} className="item">
				<p>{this.props.data.name}</p>
				{items}
			</div>
		);
	}
});

module.exports = NestableItem;