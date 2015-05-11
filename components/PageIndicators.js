/** @jsx React. DOM */

var TouchAnchor = require('./TouchAnchor');

var PageIndicators = React.createClass({displayName: "PageIndicators",
	propTypes : {
		page : React.PropTypes.number.isRequired,
		numPages : React.PropTypes.number.isRequired,
		onSelectPage : React.PropTypes.func
	},

	// Factory Methods
	pageSelector : function (i) {
		var self = this;
		if (typeof self.props.onSelectPage === "function") {
			return function () {
				self.props.onSelectPage(i);
			}
		} else {
			return function() {}
		}

		return undefined;
	},

	// Render
	render : function () {
		var pages = [];
		for (var i=1; i <= this.props.numPages; i++) {
			pages.push(React.createElement(TouchAnchor, {className: (i === this.props.page) ? "current indicator" : "indicator", 
															key: i, 
															text: "", 
															onClick: this.pageSelector(i)}))
		}

		return (
			React.createElement("div", {className: "pageIndicators"}, 
				pages
			)
		);
	}
});

module.exports = PageIndicators;