/** @jsx React.DOM */
var React = require('React');

/*
	TouchAnchor is TouchButton for anchor (<a>) tags.
*/

var clickbuster = require('../utils/clickbuster');

var startX, startY;

var TouchAnchor = React.createClass({
	propTypes : {
		// the text label for the button
		text : React.PropTypes.string,
		moveThreshold : React.PropTypes.number,
		// unified click fn handler will also be called on touchEnd
		onClick : React.PropTypes.func.isRequired,
		// a delay (in ms) before the component will respond
		initialInputDelay : React.PropTypes.number,
		// disable click handler
		disabled : React.PropTypes.bool
	},

	// lifecycle
	getDefaultProps : function () {
		return {
			text : "link",
			moveThreshold : 10,
			initialInputDelay : 200,
		}
	},
	componentDidMount : function () {
		this.mountTime = new Date().valueOf();
	},

	// Event Handlers
	onTouchStart : function (e) {
		e.stopPropagation();

		// check too make sure input is after the specified delay
		if (new Date().valueOf() < (this.mountTime + this.props.initialInputDelay)) {
			e.preventDefault();
			return;
		}

	  this.getDOMNode().addEventListener('touchend', this.onTouchEnd, false);
	  document.body.addEventListener('touchmove', this.onTouchMove, false);

	  startX = e.touches[0].clientX;
	  startY = e.touches[0].clientY;
	},
	onTouchMove : function (e){
	  if (Math.abs(e.touches[0].clientX - startX) > this.props.moveThreshold ||
	      Math.abs(e.touches[0].clientY - startY) > this.props.moveThreshold) {
	    this.onReset(e);
	  }
	},
	onTouchEnd : function (e) {
		this.onClick(e);
	},
	onInput : function (e) {
		// check too make sure input is after the specified delay
		if (new Date().valueOf() < (this.mountTime + this.props.initialInputDelay)) {
			e.preventDefault();
			e.stopPropagation();
		}
	},
	onReset : function (e) {
		if (this.isMounted()) {
			React.findDOMNode(this).removeEventListener('touchend', this.onTouchEnd, false);
		}
	  document.body.removeEventListener('touchmove', this.onTouchMove, false);
	},
	onClick : function (e) {
		e.stopPropagation();
	  this.onReset(e);

	  if (this.props.disabled) { return; }

	  if (e.type == 'touchend') {
	    clickbuster.preventGhostClick(startX, startY);
	  }

		// check too make sure input is after the specified delay
		if (new Date().valueOf() < (this.mountTime + this.props.initialInputDelay)) {
			e.preventDefault();
			return;
		}

	  if (typeof this.props.onClick === "function") {
	  	this.props.onClick(e);
	  }
	},

	// Render
	render : function () {
		return (
			<a {...this.props} className={this.props.className + (this.props.disabled ? " disabled" : "")} onClick={this.onClick} onMouseDown={this.onInput} onTouchStart={this.onTouchStart}>{this.props.text}</a>
		);
	}
});

module.exports = TouchAnchor;