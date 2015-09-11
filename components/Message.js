import { Component, PropTypes } from 'react';

/* Message Box Compnent */

class Message extends Component {
	static propTypes = {
		message : PropTypes.string.isRequired,
	}
	static defaultProps = {
		message : "We Couldn&#39;t find what you were looking for."
	}
	// render
	render() {
		return (
			<div className="message">
				<p>{this.props.message}</p>
			</div>
		);
	}
}

export default Message;