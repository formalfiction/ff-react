import React, { Component, PropTypes } from 'react';
import clickbuster from '../utils/clickbuster';

/*
	TouchButtons work in conjunction with utils/clickbuster
	to create native-like buttons in js. They circumnavigate
	the delayed "ghost click" problem.
*/

class LoadingTouchButton extends Component {
	static propTypes = {
		// the text label for the button
		text : PropTypes.string,
		moveThreshold : PropTypes.number,
		// unified click fn handler will also be called on touchEnd
		onClick : PropTypes.func.isRequired,
		// a delay (in ms) before the component will respond.
		// good for when ui is changing under a ghost click
		initialInputDelay : PropTypes.number,
		loading : PropTypes.bool
	}
	static defaultProps = {
		className : "loadingTouchButton",
		text : "button",
		moveThreshold : 10,
		initialInputDelay : 500,
		loading : false
	}

	startX = undefined
	startY = undefined

	// lifecycle
	componentDidMount = () => {
		this.mountTime = new Date().valueOf();
	}

	// Event Handlers
	onTouchStart = (e) => {
		e.stopPropagation();

		// check too make sure input is after the specified delay
		if (new Date().valueOf() < (this.mountTime + this.props.initialInputDelay)) {
			e.preventDefault();
			return;
		}

	  React.findDOMNode(this).addEventListener('touchend', this.onTouchEnd, false);
	  document.body.addEventListener('touchmove', this.onTouchMove, false);

	  this.startX = e.touches[0].clientX;
	  this.startY = e.touches[0].clientY;
	}

	onTouchMove = (e) => {
	  if (Math.abs(e.touches[0].clientX - this.startX) > this.props.moveThreshold ||
	      Math.abs(e.touches[0].clientY - this.startY) > this.props.moveThreshold) {
	    this.onReset(e);
	  }
	}
	onTouchEnd = (e) =>  {
		this.onClick(e);
	}
	onInput = (e) =>  {
		// check too make sure input is after the specified delay
		if (new Date().valueOf() < (this.mountTime + this.props.initialInputDelay)) {
			e.preventDefault();
			e.stopPropagation();
		}
	}
	onReset = (e) =>  {
		React.findDOMNode(this).removeEventListener('touchend', this.onTouchEnd, false);
	  document.body.removeEventListener('touchmove', this.onTouchMove, false);
	}
	onClick = (e) =>  {
		e.stopPropagation();
	  this.onReset(e);

	  if (e.type == 'touchend') {
	    clickbuster.preventGhostClick(this.startX, this.startY);
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
			<button {...this.props} disabled={this.props.disabled || this.props.loading} onClick={this.onClick} onMouseDown={this.onInput} onTouchStart={this.onTouchStart}>
				{(this.props.loading) ? <div className="spinner">
																	<div className="bounce1"></div>
																	<div className="bounce2"></div>
																	<div className="bounce3"></div>
																</div> : this.props.text}
			</button>
		);
	}
}

export default LoadingTouchButton;