import React, { Component, PropTypes } from 'react';
import DeviceStore from "../stores/DeviceStore";
import _ from 'underscore';
import Spinner from './Spinner';

class List extends Component {
	static propTypes = {
		className : PropTypes.string,
		data : PropTypes.array.isRequired,
		loading : PropTypes.bool,
		// Func to call when we need more rows, typically 
		// from scrolling down the screen
		onLoadMore : PropTypes.func,
		// should be a react element that we can iterate with
		element : PropTypes.func,
		// string to display when we have no items in the list
		noItemsString : PropTypes.string,
		// array of indexes to add "selected" class to.
		// for a single selection, pass in a single element array :)
		selected : PropTypes.array
	}
	static defaultProps = {
			className : "list",
			noItemsString : "No Items",
			data : [],
			selected : []
	}

	// lifecycle
	componentDidMount = () => {
		DeviceStore.onScroll(this.onScroll);
	}
	componentWillUnmount = () => {
		DeviceStore.offScroll(this.onScroll);
	}

	// handlers
	onScroll = (e) => {
		if (typeof this.props.onLoadMore == "function" && !this.props.loading && this.isMounted()) {
			var height = e.target.scrollHeight;

			// only call onLoadMore if we're in the bottom 85% of the page and scrolling down
			if ((e.target.scrollTop + e.target.offsetHeight) > (height * 0.85) && e.lastScrollY < e.target.scrollTop) {
				this.props.onLoadMore();
			}
		}
	}

	// Render
	render() {
		var items = [], loader, selected;

		if (this.props.data.length) {
			items = this.props.data.map(function(m, i){
				selected = false;
				for (var j=0; j < this.props.selected.length; j++) {
					if (i === this.props.selected[j]) { selected = true; break; }
				}
				
				return (<this.props.element {...this.props} selected={selected} data={m} index={i} key={m.id || m.cid || i} />);
			}, this);
		} else if (!this.props.loading) {
			items = <div className="noItems"><h4 className="text-center">{this.props.noItemsString}</h4></div>
		}

		if (this.props.loading) {
			loader = <Spinner />
		}

		return (
				<div className={this.props.className}>
					{items}
					{loader}
				</div>
			);
	}
}

export default List;