import React, { Component, PropTypes } from 'react';

class TouchTextarea extends Component {
	static propTypes = {
		// default height for the field
		defaultHeight : PropTypes.number,
		// you should probably name yo fields
		name : PropTypes.string.isRequired,
		// value of the field
		value : PropTypes.string.isRequired,
		// a delay (in ms) before the component will respond.
		// good for when ui is changing under a ghost click
		initialInputDelay : PropTypes.number,
		// if true, the textarea will automatically grow
		// to match the height of the text it contains
		autoGrow : PropTypes.bool,
		// Use either onChange, or onValueChange. Not both.
		// Raw change event
		onChange : PropTypes.func,
		// change handler in the form (value, name)
		onValueChange : PropTypes.func,
	}
	static defaultProps = {
		name : "textarea",
		initialInputDelay : 500,
		autoGrow : true,
		defaultHeight : 30,
	}
	state = {
		height : 0
	}

	// lifecycle
	componentDidMount = () => {
		this.mountTime = new Date().valueOf();
		this.setHeight();
	}
	componentDidUpdate = () => {
		this.setHeight();
	}

	// Methods
	setHeight = () => {
		var el = this.getDOMNode();
		if (this.props.autoGrow) {
			// set the height to 1px before rendering
			el.setAttribute('style', "height : 1px");
			var newHeight = el.scrollHeight + 1;

			if (newHeight != this.state.height) {
				this.setState({ height : newHeight });
			}

			el.setAttribute('style', "height : " + this.state.height + "px");
		}
	}

	// Event Handlers
	onChange = (e) => {
		var value = e.target.value;
		
		this.setHeight();

		if (typeof this.props.onChange === "function") {
			this.props.onChange(e);
		} else if (typeof this.props.onValueChange === "function") {
			this.props.onValueChange(value, this.props.name);
		}
	}
	onMouseDown = (e) => {

		if (new Date().valueOf() < (this.mountTime + this.props.initialInputDelay)) {
			e.preventDefault();
			e.stopPropagation();
			return;
		}

		if (typeof this.props.onMouseDown === "function") {
			this.props.onMouseDown(e);
		}
	}

	// Render
	style = () => {
		return {
			height : (this.state.height || this.props.defaultHeight)
		}
	}

	render() {
		return (
			<textarea {...this.props} style={this.style()} onChange={this.onChange} onMouseDown={this.onMouseDown} value={this.props.value} />
		);
	}
}

export default TouchTextarea;