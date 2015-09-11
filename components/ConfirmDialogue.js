import { Component, PropTypes } from 'react';
import TouchButton from './TouchButton';

/* 
 * Generic Conrim Action Dialogue
 */


class ConfirmDialogue extends Component {
	static propTypes = {
		confirmButtonTitle : PropTypes.string,
		cancelButtonTitle : PropTypes.string,
		// Cancel Handler
		onCancel : PropTypes.func.isRequired,
		// Delete Handler
		onConfirm : PropTypes.func.isRequired,
		title : PropTypes.string,
		message : PropTypes.string,
		element : PropTypes.element
	}

	// Component lifecycle methods
	static defaultProps = {
		title : "Are You Sure?",
		message : "This action cannot be undone.",
		cancelButtonTitle : "Cancel",
		confirmButtonTitle : "Confirm"
	}

	// Render
	render() {
		let contents;
		if (this.props.element) {
			contents = this.props.element
		} else {
			contents = <p>{this.props.message}</p>
		}
		
		return (
			<div className="confirm modal">
				<h2>{this.props.title}</h2>
				{contents}
				<div className="buttons">
					<TouchButton onClick={this.props.onCancel} text={this.props.cancelButtonTitle} />
					<TouchButton onClick={this.props.onConfirm} text={this.props.confirmButtonTitle} />
				</div>
			</div>
		);
	}
});

export default ConfirmDialogue;