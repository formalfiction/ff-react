import { Component, PropTypes } from 'react';

// @stateful

class TouchInput extends Component {
	static propTypes = {
		// a delay (in ms) before the component will respond.
		// good for when ui is changing under a ghost click
		initialInputDelay : PropTypes.number,
		// gotta name yo fields
		name : PropTypes.string.isRequired,
		onChange : PropTypes.func,
		onValueChange : PropTypes.func,
	}
	static defaultProps = {
		initialInputDelay : 450,
		name : "touchInput"
	}
	state = {
		readOnly : true
	}

	// Lifecycle
	componentDidMount = () => {
		var self = this;
		this.mountTime = new Date().valueOf();
		
		// here we set the field to readonly for the duration
		// of the initialInputDelay time. This prevents ghost
		// clicks from focusing the field (which would activate
		// the keyboard on touch devices)
		setTimeout(function () {
			if (self.isMounted()) {
				self.setState({ readOnly : self.props.readOnly || false });
			}
		}, this.props.initialInputDelay);
	}

	// Event Handlers
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
	onChange = (e) => {
		if (typeof this.props.onValueChange === "function") {
			this.props.onValueChange(e.target.value, this.props.name);
		} else if (typeof this.props.onChange === "function") {
			this.props.onChange(e);
		}
	}

	render() {
		return (
			<input {...this.props} readOnly={this.state.readOnly} onChange={this.onChange} onMouseDown={this.onMouseDown} />
		);
	}
}

export default TouchInput;