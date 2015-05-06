/** @jsx React.DOM */

var DeviceStore = require("../stores/DeviceStore")
	, _ = require('underscore');

var Spinner = require('./Spinner');

var List = React.createClass({
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
		if (typeof this.props.onLoadMore == "function" && !this.props.loading) {
			var body = document.body
				, html = document.documentElement
				, height = Math.max( body.scrollHeight, body.offsetHeight, 
														 html.clientHeight, html.scrollHeight, html.offsetHeight );

			// only call onLoadMore if we're in the bottom 85% of the page and scrolling down
			if ((window.scrollY + window.innerHeight) > (height * 0.85) && e.lastScrollY < window.scrollY) {
				this.props.onLoadMore();
			}
		}
	},

	// Render
	render : function () {
		var items = [], loader;


		if (this.props.data.length) {
			for (var i=0,m; m=this.props.data[i]; i++) {
				items.push(<this.props.element {...this.props} data={m} key={m.id || m.cid || i} />);
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

module.exports = List;