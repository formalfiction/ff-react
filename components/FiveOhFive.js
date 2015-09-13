import React, { Component, PropTypes } from 'react';

/* Basic 505 Error Component */

class FiveOhFive extends Component {
	static propTypes = {
		message : PropTypes.string,
		title : PropTypes.string,
	}
	static defaultProps = {
		message : "Something has gone wrong.",
		title : "Awe Shucks"
	}

	// methods
	reloadPage() {
		window.location.reload()
	}
	
	// render
	render() {
		return (
			<div className="fiveOhFive error">
				<h3>{this.props.title}</h3>
				<p>{this.props.message}</p>
				<button onClick={this.reloadPage} onTouchEnd={this.reloadPage}>Reload</button>
			</div>
		);
	}
}

export default FiveOhFive;