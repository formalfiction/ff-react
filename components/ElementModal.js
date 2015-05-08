/** @jsx React.DOM */

// modal wrapper for any react element
// stateless, by default shows a header above with
// no title & a close button that triggers onClose prop

var ElementModal = React.createClass({displayName: 'ElementModal',
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
			title : "",
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
				React.createElement("header", null, 
					React.createElement("h4", null, this.props.title), 
					React.createElement("div", {className: "close ss-icon", onClick: this.onClose, onTouchEnd: this.onClose}, "close")
				)
			);
		}
	},
	render : function () {
		return (
			React.createElement("div", {className: "modal dialogue"}, 
				this.header(), 
				this.props.element
			)
		);
	}
});

module.exports = ElementModal;