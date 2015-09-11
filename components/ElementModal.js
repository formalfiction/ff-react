import { Component, PropTypes } from 'react';

// modal wrapper for any react element
// stateless, by default shows a header above with
// no title & a close button that triggers onClose prop

class ElementModal extends Component {
	static propTypes = {
		element : PropTypes.element.isRequired,
		// supply a close handler func to actually close the
		// modal
		onClose : PropTypes.func,
		// title string for the header defaults to ""
		title : PropTypes.string,
		// set to false & it will hide the header
		// this includes the close button, so onClose will
		// never be called if this is true
		showHeader : PropTypes.bool,
	}
	static defaultProps = {
		title : "",
		showHeader : true
	}

	// handlers
	onClose = (e) => {
		if (typeof this.props.onClose === "function") {
			this.props.onClose(e);
		}
	}

	// Render
	header = () => {
		if (this.props.showHeader) {
			return (
				<header>
					<h4>{this.props.title}</h4>
					<div className="close ss-icon" onClick={this.onClose} onTouchEnd={this.onClose}>close</div>
				</header>
			);
		}
	} 
	render() {
		return (
			<div className="modal dialogue">
				{this.header()}
				{this.props.element}
			</div>
		);
	}
}

export default ElementModal;