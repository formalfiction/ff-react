import React, { Component, PropTypes } from 'react';


// *******
// *******
// @todo - UNFINISHED
// *******
// *******

class TouchSelect extends Component {
	static propTypes = {
		// a delay (in ms) before the component will respond.
		// good for when ui is changing under a ghost click
		initialInputDelay : PropTypes.number
	}
	static defaultProps = {
		initialInputDelay : 500
	}

	// Lifecycle
	componentDidMount : function () {
		this.mountTime = new Date().valueOf();
	}

	// Event Handlers
	onMouseDown : function (e) {

		if (new Date().valueOf() < (this.mountTime + this.props.initialInputDelay)) {
			e.preventDefault();
			e.stopPropagation();
			return;
		}

		if (typeof this.props.onMouseDown === "function") {
			this.props.onMouseDown(e);
		}
	}

	render() {
		return (
			<select {...this.props} onMouseDown={this.onMouseDown} >{options}</select>
		);
	}
}

export default TouchSelect;