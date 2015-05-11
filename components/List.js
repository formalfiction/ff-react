/** @jsx React.DOM */

var DeviceStore = require("../stores/DeviceStore")
	, _ = require('underscore');

var Spinner = require('./Spinner');

var List = React.createClass({displayName: "List",
	propTypes : {
		className : React.PropTypes.string,
		data : React.PropTypes.array.isRequired,
		loading : React.PropTypes.bool,
		// Func to call when we need more rows, typically 
		// from scrolling down the screen
		onLoadMore : React.PropTypes.func,
		// should be a react element that we can iterate with
		element : React.PropTypes.func,
		// string to display when we have no items in the list
		noItemsString : React.PropTypes.string
	},

	// Lifecycle
	getDefaultProps : function() {
		return {
			className : "list",
			noItemsString : "No Items",
			data : [],
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
		var items = [], loader;


		if (this.props.data.length) {
			for (var i=0,m; m=this.props.data[i]; i++) {
				items.push(React.createElement(this.props.element, React.__spread({},  this.props, {data: m, key: m.id || m.cid || i})));
			}
		} else if (!this.props.loading) {
			items = React.createElement("div", {className: "noItems"}, React.createElement("h4", {className: "text-center"}, this.props.noItemsString))
		}

		if (this.props.loading) {
			loader = React.createElement(Spinner, null)
		}

		return (
				React.createElement("div", {className: this.props.className}, 
					items, 
					loader
				)
			);
	}
});

module.exports = List;