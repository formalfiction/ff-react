/** @jsx React. DOM */
var React = require('React');

var TouchAnchor = require('./TouchAnchor');

var PageIndicators = React.createClass({
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
		if (this.props.numPages <= 1) {
			return (<div className="pageIndicators"></div>);
		}

		for (var i=1; i <= this.props.numPages; i++) {
			pages.push(<TouchAnchor className={(i === this.props.page) ? "current indicator" : "indicator"}
															key={i}
															text=""
															onClick={this.pageSelector(i)} />)
		}

		return (
			<div className="pageIndicators">
				{pages}
			</div>
		);
	}
});

module.exports = PageIndicators;