import React, { Component, PropTypes } from 'react';
import clickbuster from '../utils/clickbuster';

/*
	TouchAnchor is TouchButton for anchor (<a>) tags.
*/

var startX, startY;

class TouchAnchor extends Component {
	static propTypes = {
		// the text label for the button
		text : PropTypes.string,
		moveThreshold : PropTypes.number,
		// unified click fn handler will also be called on touchEnd
		onClick : PropTypes.func.isRequired,
		// a delay (in ms) before the component will respond
		initialInputDelay : PropTypes.number,
		// disable click handler
		disabled : PropTypes.bool
	}
	static defaultProps = {
		text : "link",
		moveThreshold : 10,
		initialInputDelay : 200,
	}

	// lifecycle
	componentDidMount = () => {
		this.mountTime = new Date().valueOf();
	}

	// handlers
	onTouchStart = (e) => {
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
	}
	onTouchMove = (e) =>{
	  if (Math.abs(e.touches[0].clientX - startX) > this.props.moveThreshold ||
	      Math.abs(e.touches[0].clientY - startY) > this.props.moveThreshold) {
	    this.onReset(e);
	  }
	}
	onTouchEnd = (e) => {
		this.onClick(e);
	}
	onInput = (e) => {
		// check too make sure input is after the specified delay
		if (new Date().valueOf() < (this.mountTime + this.props.initialInputDelay)) {
			e.preventDefault();
			e.stopPropagation();
		}
	}
	onReset = (e) => {
		this.getDOMNode().removeEventListener('touchend', this.onTouchEnd, false);
	  document.body.removeEventListener('touchmove', this.onTouchMove, false);
	}
	onClick = (e) => {
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
	}

	// Render
	render() {
		return (
			<a {...this.props} className={this.props.className + (this.props.disabled ? " disabled" : "")} onClick={this.onClick} onMouseDown={this.onInput} onTouchStart={this.onTouchStart}>{this.props.text}</a>
		);
	}
}

export default TouchAnchor;