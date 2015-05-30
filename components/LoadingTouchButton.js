/** @jsx React.DOM */

/*
	TouchButtons work in conjunction with utils/clickbuster
	to create native-like buttons in js. They circumnavigate
	the delayed "ghost click" problem.
*/

var clickbuster = require('../utils/clickbuster');

var startX, startY;

var LoadingTouchButton = React.createClass({displayName: "LoadingTouchButton",
	propTypes : {
		// the text label for the button
		text : React.PropTypes.string,
		moveThreshold : React.PropTypes.number,
		// unified click fn handler will also be called on touchEnd
		onClick : React.PropTypes.func.isRequired,
		// a delay (in ms) before the component will respond.
		// good for when ui is changing under a ghost click
		initialInputDelay : React.PropTypes.number,
		loading : React.PropTypes.bool
	},

	// lifecycle
	getDefaultProps : function () {
		return {
			className : "loadingTouchButton",
			text : "button",
			moveThreshold : 10,
			initialInputDelay : 500,
			loading : false
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
		this.getDOMNode().removeEventListener('touchend', this.onTouchEnd, false);
	  document.body.removeEventListener('touchmove', this.onTouchMove, false);
	},
	onClick : function (e) {
		e.stopPropagation();
	  this.onReset(e);

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
			React.createElement("button", React.__spread({},  this.props, {disabled: this.props.disabled || this.props.loading, onClick: this.onClick, onMouseDown: this.onInput, onTouchStart: this.onTouchStart}), 
				(this.props.loading) ? React.createElement("div", {className: "spinner"}, 
																	React.createElement("div", {className: "bounce1"}), 
																	React.createElement("div", {className: "bounce2"}), 
																	React.createElement("div", {className: "bounce3"})
																) : this.props.text
			)
		);
	}
});

module.exports = LoadingTouchButton;