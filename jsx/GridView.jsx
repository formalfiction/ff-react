/** @jsx React.DOM */

var _ = require('underscore');

var GridView = React.createClass({
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
		// number of columns to keep "pinned" to the left side
		pinnedColumns : React.PropTypes.number,
		// should scrolling along the x axis snap to each column?
		snapColumns : React.PropTypes.bool,
		// width of scrollbars
		scrollBarWidth : React.PropTypes.number
	},

	// lifecycle
	getDefaultProps : function () {
		return {
			pinnedColumns : 0,
			headerHeight : 60,
			zebraClasses : true,
			showIndexColumn : true,
			snapColumns : true,
			emptyText : "no data to display",
			scrollBarWidth : 10
		}
	},
	getInitialState : function () {
		var left = 0
			, top = this.props.headerHeight
			, heights = _.map(this.props.data,this.rowHeight)
			, widths = _.map(this.props.data[0], this.initialColWidth) 

		return {
			scrollX : 0,
			scrollY : 0,
			headerLabels :  _.map(this.props.data[0], this.colHeaderName, this),
			widths : widths,
			heights : heights,
			tops : _.map(heights, function (h) { top += h; return top - h; }),
			lefts : _.map(widths, function (w) { left += w; return left - w; }),
			docWidth : _.reduce(widths, function(memo, w){ return memo + w; }, 0),
			docHeight : _.reduce(heights, function(memo, h){ return memo + h; }, 0),
		}
	},
	componentDidMount : function () {
		if(window.onwheel !== undefined) {
		    window.addEventListener('wheel', this.onGlobalScroll)
		} else if(window.onmousewheel !== undefined) {
		    window.addEventListener('mousewheel', this.onGlobalScroll)
		} else {
		    // unsupported browser
		}

		if (this.props.data) {
			if (this.props.data.length) {
				this.updateScrollbars();
				this.matchHeaderHeight();
			}
		}
	},
	componentWillUnmount : function () {
		if(window.onwheel !== undefined) {
		    window.removeEventListener('wheel', this.onGlobalScroll)
		} else if(window.onmousewheel !== undefined) {
		    window.removeEventListener('mousewheel', this.onGlobalScroll)
		} else {
		    // unsupported browser
		}
	},
	componentWillReceiveProps : function (nextProps) {
		var left = 0
			, top = this.props.headerHeight
			, heights = _.map(nextProps.data,this.rowHeight)
			, widths = _.map(nextProps.data[0], this.initialColWidth);

		this.setState({
			headerLabels :  _.map(nextProps.data[0], this.colHeaderName, this),
			widths : widths,
			heights : heights,
			tops : _.map(heights, function (h) { top += h; return top - h; }),
			lefts : _.map(widths, function (w) { left += w; return left - w; }),
			docWidth : _.reduce(widths, function(memo, w){ return memo + w; }, 0),
			docHeight : _.reduce(heights, function(memo, h){ return memo + h; }, 0),
		});
	},
	componentDidUpdate : function () {
		if (this.props.data) {
			if (this.props.data.length) {
				this.updateScrollbars();
				this.matchHeaderHeight();
			}
		}
	},

	// methods
	colHeaderName : function (row, i) {
		return (this.props.colHeaderName) ? this.props.colHeaderName(i) : "col. " + (i+1); 
	},
	initialColWidth : function (col, i) {
		return (this.props.initialColWidth) ? this.props.initialColWidth(i) : 80;
	},
	rowHeight : function (row, i) {
		return (this.props.rowHeight) ? this.props.rowHeight(i) : 30;
	},

	// event handlers
	onGlobalScroll : function (e) {
		// @todo - constrain to only events that occur over the viewport
		var vp = React.findDOMNode(this.refs["container"])
			, x = this.state.scrollX + e.deltaX
			, y =  this.state.scrollY + e.deltaY
			, maxX = this.state.docWidth - vp.clientWidth
			, maxY = this.state.docHeight - vp.clientHeight;

		if (x < 0 || vp.clientWidth < this.state.docWidth) { x = 0; }
		else if (x > maxX) { x = maxX; }
		if (y < 0 || vp.clientHeight < this.state.docHeight) { y = 0; }
		else if (y > maxY) { y = maxY; }

		this.setState({ scrollX : x, scrollY : y});
	},

	// render
	matchHeaderHeight : function () {
		var vp = React.findDOMNode(this.refs["container"])
			, h = React.findDOMNode(this.refs["header"]);
		if (h.clientWidth < vp.clientWidth ) {
			h.style.width = vp.clientWidth + "px"
		}
	},
	// return necessary math for scrollbars
	updateScrollbars : function () {
		var vp = React.findDOMNode(this.refs["container"])
			, vsb = React.findDOMNode(this.refs["vsb"])
			, hsb = React.findDOMNode(this.refs["hsb"]);

		var vert  = calcScrollBar(this.state.docHeight, vp.clientHeight, this.state.scrollY, 25, this.props.headerHeight, 0)
			, horiz = calcScrollBar(this.state.docWidth, vp.clientWidth, this.state.scrollX, 25, 0, 0);

		vsb.style.display = (vp.clientHeight < this.state.docHeight) ? "block" : "none"
		vsb.style.top = vert[0] + "px"
		vsb.style.height = vert[1] + "px"
		hsb.style.display = (vp.clientWidth < this.state.docWidth) ? "block" : "none"
		hsb.style.left = horiz[0] + "px"
		hsb.style.width = horiz[1] + "px"
	},
	render : function () {
		var headers = [], pinnedColumns = [], cells = []
			, scrollX = this.state.scrollX
			, pinnedColumns = (this.props.pinnedColumns > 0) ? this.props.pinnedColumns - 1 : 0;

		if (!this.props.data) { return (<div className="gridView"><p>{this.props.emptyText}</p></div>)}
		else if (!this.props.data.length) { return (<div className="gridView"><p>{this.props.emptyText}</p></div>)}

		// @todo - support index columning
		// if (this.props.showIndexColumn) { row.splice(0,0,i+1); }

		if (this.props.snapColumns) {
			for (var r=0; r < this.state.lefts.length; r++) {
				var left = this.state.lefts[r];
				if (scrollX > left && scrollX < this.state.lefts[r+1]) {
					// determine which column the scroll is currently closer to.
					scrollX = ((scrollX - left) < (this.state.lefts[r+1] - scrollX)) ? left : this.state.lefts[r+1] ;
				}
			}
		}

		_.each(this.state.headerLabels, function (label, i) {
			headers.push(<div key={"header-" + i}
				className={ (i <= pinnedColumns) ? "pinned colHeader" : "colHeader" }
				style={{
					position : "absolute",
					top : 0,
					width : this.state.widths[i],
					left : (i <= pinnedColumns) ? this.state.lefts[i] : this.state.lefts[i] - scrollX,
					height : this.props.headerHeight,
				}}>{label}</div>);
		}, this);

		_.each(this.props.data, function(row, i){
			var td = [], className = "row";
			if (this.props.zebraClasses) {
				className = (i % 2 == 0) ? "even row" : "odd row";
			}

			_.each(row, function(col, j){
				td.push(<div className={ (j <= pinnedColumns) ? "pinned cell" : "cell" } data-row={i} data-col={j} style={{
					position : "absolute",
					top : 0,
					left : (j <= pinnedColumns) ? this.state.lefts[j] : this.state.lefts[j] - scrollX,
					width : this.state.widths[j],
					height : "100%"
				}} key={"row-" + i + "-col-" + j}>{col}</div>);
			}, this);

			cells.push(<div style={{
															position : "absolute",
															top : this.state.tops[i] - this.state.scrollY,
															width : "100%",
															height : this.state.heights[i],
														}} className={className} key={"row-" + i}>{td}</div>);
		}, this);

		return (
			<div ref="container" className="gridView">
				<header ref="header" className="header" style={{position : "absolute", width : this.state.docWidth, left : this.state.scrollLeft, height : this.props.headerHeight }}>
					{headers}
				</header>
				<section ref="table" className="table">
					{cells}
				</section>
				<div ref="vsb" className="scrollBar vertical" style={{ right : 2, width : this.props.scrollBarWidth }}></div>
				<div ref="hsb" className="scrollBar horizontal" style={{ bottom : 2, height : this.props.scrollBarWidth }}></div>
			</div>
		);
	}
});

// calculates the position & size of a scrollbar
function calcScrollBar (docSize, vpSize, scrollPos, minSbSize, clampStart, clampEnd) {
	minSbSize || (minSbSize = 25)
	clampStart || (clampStart = 0)
	clampEnd || (clampEnd = 0)

	var usableVp = (vpSize - clampStart - clampEnd)
		, visiblePercent = usableVp / docSize
		, size = ((usableVp * visiblePercent) > minSbSize) ? (usableVp * visiblePercent) : minSbSize
		, progressPercent = scrollPos / docSize
		, availPos = vpSize - size
		, pos = clampStart + (vpSize * progressPercent);

	return [pos,size]
}

module.exports = GridView;