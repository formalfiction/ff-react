import React, { PropTypes } from 'react';
import TouchAnchor from './TouchAnchor';

class SelectGroup extends React.Component {
	static propTypes = {
		// an array of strings
		items : PropTypes.array.isRequired,
		// the currently selected string
		selected : PropTypes.string.isRequired,
		// selection handler
		onChange : PropTypes.func.isRequired,
	}

	// factory func to glue list to handler
	selector = (list) => {
		return () => {
			if (this.props.selected != list) {
				this.props.onChange(list);
			}
		}
	}

	render() {
		return (
			<div className="selectGroup">
				{this.props.items.map((item, i) => {
					return (
						<TouchAnchor
							className={this.props.selected === item ? "current item" : "item"}
							key={i}
							onClick={this.selector(item)}
							text={item} />
					);
				})}
			</div>
		);
	}
}

export default SelectGroup;