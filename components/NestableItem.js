import { Component, PropTypes } from 'react';


// A placeholder Nestable Item
class NestableItem extends Component {
	render() {
		let items, data = this.props.data
		if (data.data) {
			items = <div className="list">
								{
									data.data.map(function(d,i){
										return <NestableItem {...this.props} data-list={this.props.index} data-index={i} key={this.props.index + "." + i} data={d} />
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
}

export default NestableItem;