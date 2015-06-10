/** @jsx React.DOM */

var _ = require('underscore');

var GridView = React.createClass({displayName: "GridView",
	propTypes : {
		// data should be an array of arrays, but can be transformed with the
		// "map" prop-func
		data : React.PropTypes.array.isRequired,
		// function to return the name of each column
		colHeaderName : React.PropTypes.func,
		// predicate to return the initial width of a column. 
		initialColWidth : React.PropTypes.func,
		headerHeight : React.PropTypes.number,
		rowHeight : React.PropTypes.func,
		// show the row number
		showIndexColumn : React.PropTypes.bool,
		// add "odd" & "even" classes rows
		zebraClasses : React.PropTypes.bool,
		// text to display if no data is given
		emptyText : React.PropTypes.string,
	},

	// lifecycle
	getDefaultProps : function () {
		return {
			headerHeight : 60,
			zebraClasses : true,
			showIndexColumn : true,
			emptyText : "no data to display"
		}
	},
	getInitialState : function () {
		var left = 0
			, top = this.props.headerHeight
			, heights = _.map(this.props.data,this.rowHeight)
			, widths = _.map(this.props.data[0], this.initialColWidth) 

		return {
			scrollLeft : 0,
			headerLabels :  _.map(this.props.data[0], this.colHeaderName),
			widths : widths,
			heights : heights,
			width : _.reduce(widths, function(memo, w){ return memo + w; }, 0),
			tops : _.map(heights, function (h) { top += h; return top - h; }),
			lefts : _.map(widths, function (w) { left += w; return left - w; }),
		}
	},
	colHeaderName : function (row, i) {
		return (this.props.colHeaderName) ? this.props.colHeaderName(row, i) : "col. " + (i+1); 
	},
	initialColWidth : function (col, i) {
		return (this.props.initialColWidth) ? this.props.initialColWidth(col,i) : 100;
	},
	rowHeight : function (row, i) {
		return (this.props.rowHeight) ? this.props.rowHeight(row, i) : 40;
	},

	// event handlers
	onScrollTable : function (e) {
		this.setState({ scrollLeft : -e.target.scrollLeft });
	},

	// render
	render : function () {
		var headers = [], table = [];

		if (!this.props.data) { return (React.createElement("div", {className: "gridView"}, React.createElement("p", null, this.props.emptyText)))}
		else if (!this.props.data.length) { return (React.createElement("div", {className: "gridView"}, React.createElement("p", null, this.props.emptyText)))}

		// @todo - support index columning
		// if (this.props.showIndexColumn) { row.splice(0,0,i+1); }

		_.each(this.state.headerLabels, function (label, i) {
			headers.push(React.createElement("div", {key: "header-" + i, style: {
				position : "absolute",
				top : 0,
				width : this.state.widths[i],
				left : this.state.lefts[i],
				height : this.props.headerHeight,
			}}, label));
		}, this);

		_.each(this.props.data, function(row, i){
			var cells = [], className = "row";
			if (this.props.zebraClasses) {
				className = (i % 2 == 0) ? "even row" : "odd row";
			}

			_.each(row, function(col, j){
				cells.push(React.createElement("div", {"data-row": i, "data-col": j, style: {
					position : "absolute",
					top : 0,
					left : this.state.lefts[j],
					width : this.state.widths[j],
					height : "100%"
				}, key: "row-" + i + "-col-" + j}, col));
			}, this);

			table.push(React.createElement("div", {style: {
															position : "absolute",
															top : this.state.tops[i],
															width : "100%",
															height : this.state.heights[i],
														}, className: className, key: "row-" + i}, cells));
		}, this);

		return (
			React.createElement("div", {className: "gridView"}, 
				React.createElement("header", {ref: "header", style: {position : "absolute", width : this.state.width, overflow : "hidden", zIndex : 1, left : this.state.scrollLeft}}, 
					headers
				), 
				React.createElement("section", {ref: "table", style: {position : "absolute", width : "100%", height : "100%", overflow : "auto"}, onScroll: this.onScrollTable}, 
					table
				)
			)
		);
	}
});

module.exports = GridView;