import { Component, PropTypes } from 'react';

// A simple Spinner

class Spinner extends Component {
	// Render
	render() {
		return (
			<div className="spinner">
				<div className="bounce1"></div>
				<div className="bounce2"></div>
				<div className="bounce3"></div>
			</div>
		);
	}
}

export default Spinner;