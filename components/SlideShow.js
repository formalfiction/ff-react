import React, { Component, PropTypes } from 'react';

/* @stateful
 * SlideShow is your classic, one-up slider
 */

class SlideShow extends Component {
	static propTypes = {
		loop : PropTypes.bool,
		onSlideEnd : PropTypes.func,
		onSlideBegin : PropTypes.func,
		onSelect : PropTypes.func,
		showButtons : PropTypes.bool,
		showPageIndicators : PropTypes.bool,
		// slides is an array of either components or objects
		slides : PropTypes.array.isRequired,
		width : PropTypes.number,
		height : PropTypes.number
	}
	static defaultProps = {
			showPageIndicators : true,
			showButtons : true,
			loop : false,
			slides : [],
			width : 400,
			height : 300
	}

	// Lifcycle
	state = {
		slide : 0
	}

	// Methods
	next = () => {
		if (this.state.slide < (this.props.slides.length - 1)) {
			this.setState({ slide : this.state.slide + 1 });
		} else if (this.props.loop) {
			this.setState({ slide : 0 });
		}
	}
	previous = () => {
		if (this.state.slide > 0) {
			this.setState({ slide : this.state.slide - 1 })
		} else if (this.props.loop) {
			this.setState({ slide : this.state.slides.length - 1})
		}
	}
	toSlide = (i) => {
		if (i >= this.props.slides.length) {
			i = this.props.slides.length - 1;
		} else if (i < 0) {
			i = 0;
		}

		this.setState({ slide : i });
	}

	// Event Handlers
	onPrevious = (e) => {
		this.previous();
	}
	onNext = (e) => {
		this.next();
	}
	onPickIndicator = (e) => {
		this.toSlide(+e.target.getAttribute('data-slide'));
	}
	onTouchStart = (e) => {

	}
	onTouchEnd = (e) => {

	}
	onMouseDown = (e) => {

	}
	onMouseUp = (e) => {

	}

	// Render
	sliderStyle = () => {
		return {
			width : this.props.width,
			height : this.props.height
		}
	}
	stageStyle = () => {
		return {
			top : 0,
			left : (-this.state.slide * 100) + "%",
			width : (100 * this.props.slides.length) + "%",
			height : "100%"
		}
	}
	slideStyle = () => {
		return {
			width : (100 / this.props.slides.length) + "%",
			height : "100%",
			float : "left"
		}
	}
	indicators = () => {
		var self = this
			, indicators = [];
		
		this.props.slides.forEach(function(slide, i){
			var c = (i === self.state.slide) ? "current indicator" : "indicator";
			indicators.push(<span key={i} data-slide={i} className={c} onClick={self.onPickIndicator} onTouchEnd={this.onPickIndicator}></span>);
		});

		return (
			<div className="indicators">
				{indicators}
			</div>
		);
	}
	render() {
		var self = this
			, slides = []
			, pageIndicators, prevButton, nextButton;

		this.props.slides.forEach(function(slide,i){
			slides.push(<div className="slide" key={i} style={self.slideStyle()}><img src={slide} /></div>)
		});

		if (this.props.showPageIndicators) {
			pageIndicators = this.indicators();
		}
		if (this.props.showButtons) {
			prevButton = <div className="previous button icon" onClick={this.onPrevious} onTouchEnd={this.onPrevious}>prev</div>
			nextButton = <div className="next button icon" onClick={this.onNext} onTouchEnd={this.onNext}>next</div>
		}

		return (
			<div className="slideShow" style={this.sliderStyle()}>
				<div className="stage" style={this.stageStyle()}>
					{slides}
				</div>
				{prevButton}
				{nextButton}
				{pageIndicators}
			</div>
		);
	}
}

export default SlideShow;
