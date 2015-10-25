import React, { Component, PropTypes } from 'react';


var Switch extends Component {
	static propTypes = {
		enabled : PropTypes.bool,
		onToggle : PropTypes.func.isRequired,
	}
	static defaultProps = {
		enabled : true,
	}

	// handlers
	onToggle = (e) => {
		if (typeof this.props.onToggle === "function") {
			this.props.onToggle(!this.props.enabled);
		}
	}

	// Render
	render() {
		var switchClassName= this.props.enabled ? "onoffswitch on" : "onoffswitch off";
		return (
			<div className="switch">
				<div onClick={this.onToggle} onTouchEnd={this.onToggle} className={switchClassName}>
			    <label className="label" htmlFor="myonoffswitch">
		        <span className="inner"></span>
		        <span className="switch"></span>
			    </label>
				</div>
			</div>
		);
	}
}

export default Switch;