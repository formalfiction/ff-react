import { Component, PropTypes } from 'react';
import TouchAnchor from './TouchAnchor';

class PageIndicators extends Component {
	static propTypes = {
		page : PropTypes.number.isRequired,
		numPages : PropTypes.number.isRequired,
		onSelectPage : PropTypes.func
	}

	// Factory Methods
	pageSelector = (i) => {
		if (typeof this.props.onSelectPage === "function") {
			return () => {
				this.props.onSelectPage(i);
			}
		} else {
			return function() {}
		}

		return undefined;
	}

	// render
	render() {
		var pages = [];
		if (this.props.numPages <= 1) {
			return (<div className="pageIndicators"></div>);
		}

		for (var i=1; i <= this.props.numPages; i++) {
			pages.push(<TouchAnchor className={(i === this.props.page) ? "current indicator" : "indicator"}
															key={i}
															text=""
															onClick={this.pageSelector(i)} />)
		}

		return (
			<div className="pageIndicators">
				{pages}
			</div>
		);
	}
}

export default PageIndicators;