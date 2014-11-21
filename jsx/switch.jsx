/** @jsx React.DOM */


var Switch = React.createClass({
	propTypes : {
		enabled : React.PropTypes.bool,
		onToggle : React.PropTypes.func.isRequired,
	},

	// lifecycle
	getDefaultProps : function () {
		return {
			enabled : true,
		}
	},

	// Event Handlers
	onToggle : function (e) {
		if (typeof this.props.onToggle === "function") {
			this.props.onToggle(!this.props.enabled);
		}
	},

	// Render
	render : function () {
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
});

module.exports = UseGeolocation