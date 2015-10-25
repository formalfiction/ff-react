import React, { Component, PropTypes } from 'react';

var startX, startY;

class Slider extends Component {
	static propTypes = {
	  min: PropTypes.number,
	  max: PropTypes.number,
	  step : PropTypes.number,
	  onChange: PropTypes.func,
	}
	static defaultProps = {
		min: 0,
		max: 100,
		step: 1,
		defaultValue: 0,
		disabled: false
	}

	// Lifecycle
	state = {
  	value : 50
	}

	// Event Handlers
	onTouchStart = (e) => {
		e.stopPropagation();
		if (this.state.disabled) { return; }

		React.findDOMNode(this).addEventListener('touchend', this.onTouchEnd, false);
		document.body.addEventListener('touchmove', this.onTouchMove, false);

		startX = e.touches[0].clientX;
		this.setState({ select : true, startX : this.state.x });
	}
	onTouchMove = () => {
		var handle = React.findDOMNode(this.refs['handle'])
			, select = this.state.select
			, track = React.findDOMNode(this.refs['track'])
			, newX = this.state.startX + (e.touches[0].clientX - startX)

		if (newX < -(scroller.offsetWidth - track.offsetWidth)) {
			newX = -(scroller.offsetWidth - track.offsetWidth)
		} else if (newX > 0) {
			newX = 0
		}

		// Check to see if we should select at the end
		// of touches
		if (select) {
			if (Math.abs(e.touches[0].clientX - startX) > this.props.moveThreshold ||
			  Math.abs(e.touches[0].clientY - startY) > this.props.moveThreshold) {
				select = false;
			}
		}

		this.setState({
			select : select,
			x : newX,
		});
	}
	onTouchEnd = () => {
		this.onTouchReset.call(this, e);
		if (this.state.select) {
			this.onSelect(e);
		}
	}
	onMouseDown = () => {

	}
	onMouseMove = () => {

	}
	onMouseUp = () => {

	}

	// Render
	style = () => {
		return {}
	}
	render() {
		return (
			<div className="slider" style={this.style()}>
				<div ref="track" className="track">
					<div className="highlight"></div>
					<div ref="handle" className="handle" onMouseDown={this.onMouseDown} onTouchStart={this.onTouchStart}></div>
				</div>
			</div>
		)
	}
}

export default Slider;