import { Component, PropTypes } from 'react';

/* Standard Not-Found Component with a go-back button. */

class FourOhFour extends Component{
	static propTypes = {
		message : PropTypes.string,
		title : PropTypes.string
	}
	static defaultProps =  {
		title : "Not Found",
		message : "We Couldn't find what you were looking for."
	}

	// methods
	goBack() {
		if (window.history) {
			window.history.back()
		}
	}

	// render
	render() {
		return (
			<div className="fourOhFour">
				<h3>{this.props.title}</h3>
				<p>{this.props.message}</p>
				<button onClick={this.reloadPage} onTouchEnd={this.goBack}>Reload</button>
			</div>
		);
	}
}

export default FourOhFour;