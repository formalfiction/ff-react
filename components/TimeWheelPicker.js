import React, { Component, PropTypes } from 'react';
import iScroll from '../libs/iscroll';
import time from '../utils/time';

function copyTouch (t) {
	return { identifier: t.identifier, pageX: t.pageX, pageY: t.pageY, screenX : t.screenX, screenY : t.screenY };
}

// A Single Column Time Picker
class TimeWheelPicker extends Component {
	static propTypes = {
		value : PropTypes.object.isRequired,
		mustBefore : PropTypes.object,
		mustAfter : PropTypes.object,
		// interval in minutes
		interval : PropTypes.number,
		// how far (in pixels) a touch event has to move before
		// it's considered scrolling instead of a tap
		yTouchThreshold : PropTypes.number,
	}
	static defaultProps = {
		className : "timeColumnPicker",
		interval : 15,
		value : new Date(),
		yTouchThreshold : 5,
		scrollerOptions : {
			mouseWheel : true,
			snap : 'li',
			snapThreshold : 0.334,
		}
	}

	// And now a little uglyness:
	startTouch : undefined
	endTouch : undefined

	// lifecycle
	componentDidMount = () => {
		this.scroller = new iScroll(React.findDOMNode(this.refs["scroller"]), this.props.scrollerOptions);
		this.scroller.on('scrollEnd', this.scrollEnder());
		// this.scroller.on('touchEnd', this.props.onTouchEnd);

		this.locked = true;
		this.scrollToTime(this.props.value);
	}
	componentDidUpdate = () => {
		this.locked = true;
		this.scrollToTime(this.props.value);
	}

	// Methods
	scrollToTime = (date) => {
		var i = date.getHours()
			, minutes
			, minI;

		if (this.props.interval < 60 && this.props.interval !== 0) {
			minI = Math.round(date.getMinutes() / this.props.interval);
			i = (i * Math.round(60 / this.props.interval)) + minI;
		} else {
			// if we're in hour-only mode, we still need to check to see
			// if minutes puts us closer to one hour or the other
			if (date.getMinutes() != 0) {
				i += Math.round(date.getMinutes() / 60);
			}
		}

		this.setSelected(this.scroller, i + 2);
		this.scroller.goToPage(0,i,150);
	}
	setSelected = (iscroll, sel) => {
		for (var i=0; i < iscroll.scroller.children.length; i++){
			iscroll.scroller.children[i].className = (sel === i) ? "selected" : "";
		}
	}

	// Factory Funcs
	scrollEnder = () => {
		var self = this
		return function () {
			// add 2 to choose the center element (hopefully in the middle)
			var i = this.currentPage.pageY + 2
				, el = this.scroller.children[i]
				, value = new Date(el.getAttribute("data-value"));

			if (i < 2) { i = 2; }
			else if (i > (this.scroller.children.length - 4)) { i = this.scroller.children.length -4; }

			if (self.locked) {
				self.locked = false;
				return;
			}

			if (self.props.value.valueOf() != value.valueOf()) {
				self.props.onValueChange(value, self.props.name);
			}
		}
	}

	// Event Handlers
	onTouchStart = (e) => {
		this.startTouch = copyTouch(e.touches[0]);
	}
	onTouchEnd = (e) => {
		var el = e.target
			, value = new Date(el.getAttribute("data-value"));

		this.endTouch = copyTouch(e.changedTouches[0]);
		this.locked = false;

		// Only trigger if not scrolling
		if (Math.abs(this.startTouch.pageY - this.endTouch.pageY) < this.props.yTouchThreshold) {
			e.stopPropagation();
			if (this.props.value.valueOf() != value.valueOf()) {
				this.props.onValueChange(value, this.props.name);
			}
		}

		this.startTouch = undefined;
		this.endTouch = undefined;
	}
	onClick = (e) => {
		var el = e.target
			, value = new Date(el.getAttribute("data-value"));

		if (this.props.value.valueOf() != value.valueOf()) {
			e.stopPropagation();
			this.props.onValueChange(value, this.props.name);
		}
	}

	// iterate over each time, calling func
	// with (hour, min, phase, index)
	eachTime = (func) => {
		var l = 23, interval, d;

		// count by hours if interval is either 0 or 60
		if (!this.props.interval || this.props.interval >= 60) {
			for (var h=0; h <= l; h++) {
				func(time.newDate(this.props.value.getFullYear(), this.props.value.getMonth(), this.props.value.getDate(), h, 0), h);
			}

		// otherwise use an inner loop for minutes
		} else {
			var i = 0;
			for (var h=0; h <= l; h++) {
				for (var m=0; m < 60; m += this.props.interval) {
					func(time.newDate(this.props.value.getFullYear(), this.props.value.getMonth(), this.props.value.getDate(), h, m), i);
					i++;
				}
			}
		}
	}

	// Render 
	render() {
		var times = []
			, self = this

		this.eachTime(function (value,index) {
			times.push(<li key={index} onClick={self.onClick} onTouchStart={self.onTouchStart} onTouchEnd={self.onTouchEnd} data-value={value.toString()}>{time.timeString(value)}</li>);
		});

		return (
			<div {...this.props} ref="scroller">
				<ul>
					<li></li>
					<li></li>
					{times}
					<li></li>
					<li></li>
				</ul>
			</div>
		);
	}
}

export default TimeWheelPicker;