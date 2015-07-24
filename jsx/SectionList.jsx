/** @jsx React.DOM */

var DeviceStore = require("../stores/DeviceStore")
	, _ = require('underscore');

var Spinner = require('./Spinner');

var SectionList = React.createClass({
	propTypes : {
		// data MUST come in as an array of objects, where each object has:
		// a "section" property, that is an object to populate the section
		// header with
		// a "data" property, that is an array of list items
		data : React.PropTypes.array.isRequired,
		// loading flag
		loading : React.PropTypes.bool,
		// Func to call when we need more rows, typically 
		// from scrolling down the screen
		onLoadMore : React.PropTypes.func,
		// should be a react component that we can iterate with
		header : React.PropTypes.func.isRequired,
		// should be a react element that we can iterate with
		element : React.PropTypes.func.isRequired,
		// string to display when we have no items in the list
		noItemsString : React.PropTypes.string,
		// array of indexes to add "selected" class to.
		// for a single selection, pass in a single element array :)
		selected : React.PropTypes.array
	},

	// Lifecycle
	getDefaultProps : function() {
		return {
			className : "list",
			noItemsString : "No Items",
			data : [],
			selected : []
		}
	},
	componentDidMount : function () {
		DeviceStore.onScroll(this.onScroll);
	},
	componentWillUnmount : function () {
		DeviceStore.offScroll(this.onScroll);
	},

	// Event Handlers
	onScroll : function (e) {
		if (typeof this.props.onLoadMore == "function" && !this.props.loading && this.isMounted()) {
			var height = e.target.scrollHeight;

			// only call onLoadMore if we're in the bottom 85% of the page and scrolling down
			if ((e.target.scrollTop + e.target.offsetHeight) > (height * 0.85) && e.lastScrollY < e.target.scrollTop) {
				this.props.onLoadMore();
			}
		}
	},

	// Render
	render : function () {
		var items = [], loader, selected, num = 0;

		if (this.props.data.length) {
			for (var i=0,s; s=this.props.data[i]; i++) {
				items.push(<this.props.header data={s.section} key={"section-" + i} />);
				for (var j=0,m; m=s.data[j]; j++) {
					selected = false;
					for (var k=0; k < this.props.selected.length; k++) {
						if (num === this.props.selected[k]) { selected = true; break; }
					}
					items.push(<this.props.element {...this.props} selected={selected} data={m} index={num} key={m.id || m.cid || i+"."+j} />);
					num++;
				}
			}
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
});

module.exports = SectionList;