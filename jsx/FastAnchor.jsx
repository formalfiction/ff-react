/** @jsx React.DOM */

/*
	FastAnchor is fastButton for anchor (<a>) tags.
	they work in conjunction with utils/clickbuster
	to create native-like buttons in js. They circumnavigate
	the delayed "ghost click" problem.
*/

var clickbuster = require('../utils/clickbuster');

var startX, startY;

var FastAnchor = React.createClass({
	propTypes : {
		// the text label for the button
		text : React.PropTypes.string,
		moveThreshold : React.PropTypes.number,
		// unified click fn handler will also be called on touchEnd
		onClick : React.PropTypes.func.isRequired
	},

	// lifecycle
	getDefaultProps : function () {
		return {
			text : "button",
			moveThreshold : 10
		}
	},

	// Event Handlers
	onTouchStart : function (e) {
		e.stopPropagation();

	  this.getDOMNode().addEventListener('touchend', this.onTouchEnd, false);
	  document.body.addEventListener('touchmove', this.onTouchMove, false);

	  startX = e.touches[0].clientX;
	  startY = e.touches[0].clientY;
	},
	onTouchMove : function (e){
	  if (Math.abs(event.touches[0].clientX - startX) > this.props.moveThreshold ||
	      Math.abs(event.touches[0].clientY - startY) > this.props.moveThreshold) {
	    this.onReset(e);
	  }
	},
	onTouchEnd : function (e) {
		this.onClick(e);
	},
	onClick : function (e) {
		e.stopPropagation();
	  this.onReset(e);

	  if (e.type == 'touchend') {
	    clickbuster.preventGhostClick(startX, startY);
	  }

	  if (typeof this.props.onClick === "function") {
	  	this.props.onClick(e);
	  }
	},
	onReset : function (e) {
		this.getDOMNode().removeEventListener('touchend', this, false);
	  document.body.removeEventListener('touchmove', this, false);
	},

	// Render
	render : function () {
		return (
			<a className={this.props.className} onClick={this.onClick} onTouchStart={this.onTouchStart}>{this.props.text}</a>
		);
	}
});

module.exports = FastAnchor;