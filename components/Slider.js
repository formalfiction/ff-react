/** @jsx React.DOM */

var startX, startY;

var Slider = React.createClass({displayName: "Slider",
	propTypes: {
	  min: React.PropTypes.number,
	  max: React.PropTypes.number,
	  step : React.PropTypes.number,
	  onChange: React.PropTypes.func,
	},

	// Lifecycle
	getDefaultProps: function () {
	  return {
			min: 0,
			max: 100,
			step: 1,
			defaultValue: 0,
			disabled: false
	  };
	},
	getInitialState: function () {
	  return {
	  	value : 50
	  };
	},

	// Event Handlers
	onTouchStart : function (e) {
		e.stopPropagation();
		if (this.state.disabled) { return; }

		this.getDOMNode().addEventListener('touchend', this.onTouchEnd, false);
		document.body.addEventListener('touchmove', this.onTouchMove, false);

		startX = e.touches[0].clientX;
		this.setState({ select : true, startX : this.state.x });
	},
	onTouchMove : function () {
		var handle = this.refs['handle'].getDOMNode()
			, select = this.state.select
			, track = this.refs['track'].getDOMNode()
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
	},
	onTouchEnd : function () {
		this.onTouchReset.call(this, e);
		if (this.state.select) {
			this.onSelect(e);
		}
	},

	onMouseDown : function () {

	},
	onMouseMove : function () {

	},
	onMouseUp : function () {

	},

	// Render
	style : function () {
		return {
		}
	},
	render : function () {
		return (
			React.createElement("div", {className: "slider", style: this.style()}, 
				React.createElement("div", {ref: "track", className: "track"}, 
					React.createElement("div", {className: "highlight"}), 
					React.createElement("div", {ref: "handle", className: "handle", onMouseDown: this.onMouseDown, onTouchStart: this.onTouchStart})
				)
			)
		)
	}
});

module.exports = Slider;