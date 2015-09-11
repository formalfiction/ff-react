import { Component } from 'react';

// A placeholder Item
class Item extends Component {
	render() {
		let title = this.props.data;
		if (typeof title === "object") {
			title = this.props.data.name || this.props.data.title;
		}
		
		return (
			<div {...this.props} className="item">
				<p>{title}</p>
			</div>
		);
	}
}

export default Item;