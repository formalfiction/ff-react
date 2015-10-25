import React, { Component, PropTypes } from 'react';
import TouchButton from './TouchButton';

/*
 * A Basic Dialogue with an accept button
 */

class Dialogue extends Component {
	static propTypes = {
		acceptButtonTitle : PropTypes.string,
		// Accept Handler
		onAccept : PropTypes.func.isRequired,
		message : PropTypes.string,
		modal : PropTypes.bool,
		title : PropTypes.string,
	}
	static defaultProps = {
		title : "Uh Oh.",
		message : "Something has gone wrong.",
		acceptButtonTitle : "Ok",
	}

	// render
	render() {
		return(
			<div className={this.props.modal ? "modal dialogue" : "dialogue"}>
				<h3 className="title">{this.props.title}</h3>
				<p className="message">{this.props.message}</p>
				<TouchButton className="accept" onClick={this.props.onAccept} text={this.props.acceptButtonTitle} />
			</div>
		)
	}
}

export default Dialogue;