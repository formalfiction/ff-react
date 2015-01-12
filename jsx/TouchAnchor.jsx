/** @jsx React.DOM */

/*
	TouchAnchor is TouchButton for anchor (<a>) tags.
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
			text : "link",
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
	  if (Math.abs(e.touches[0].clientX - startX) > this.props.moveThreshold ||
	      Math.abs(e.touches[0].clientY - startY) > this.props.moveThreshold) {
	    this.onReset(e);
	  }
	},
	onTouchEnd : function (e) {
		this.onClick(e);
	},
	onReset : function (e) {
		this.getDOMNode().removeEventListener('touchend', this.onTouchEnd, false);
	  document.body.removeEventListener('touchmove', this.onTouchMove, false);
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

	// Render
	render : function () {
		return (
			<a className={this.props.className} onClick={this.onClick} onTouchStart={this.onTouchStart}>{this.props.text}</a>
		);
	}
});

module.exports = FastAnchor;