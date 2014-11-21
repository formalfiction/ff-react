/** @jsx React.DOM */

// modal wrapper for any react element
// stateless, by default shows a header above with
// no title & a close button that triggers onClose prop

var ElementModal = React.createClass({
	propTypes : {
		element : React.PropTypes.element.isRequired,
		// supply a close handler func to actually close the
		// modal
		onClose : React.PropTypes.func,
		// title string for the header defaults to ""
		title : React.PropTypes.string,
		// set to false & it will hide the header
		// this includes the close button, so onClose will
		// never be called if this is true
		showHeader : React.PropTypes.bool,
	},

	//lifecycle
	getDefaultProps : function () {
		return {
			title : ""
			showHeader : true
		}
	},

	// event handlers
	onClose: function (e) {
		if (typeof this.props.onClose === "function") {
			this.props.onClose(e);
		}
	},

	// Render
	header : function () {
		if (this.props.showHeader) {
			return (
				<header>
					<h4>{this.props.title}</h4>
					<div className="close ss-icon" onClick={this.onClose} onTouchEnd={this.onClose}>close</div>
				</header>
			);
		}
	},
	render : function () {
		return (
			<div className="modal dialogue">
				{this.header()}
				{this.props.element}
			</div>
		);
	}
});

module.exports = ElementModal;