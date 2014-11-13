/** @jsx React.DOM */

/* 
 * Generic Conrim Action Dialogue
 */

var ConfirmDialogue = React.createClass({
	propTypes : {
		confirmButtonTitle : React.PropTypes.string,
		cancelButtonTitle : React.PropTypes.string,
		// Cancel Handler
		onCancel : React.PropTypes.func.isRequired,
		// Delete Handler
		onConfirm : React.PropTypes.func.isRequired,
		title : React.PropTypes.string,
		message : React.PropTypes.string,
	},

	// Component lifecycle methods
	getDefaultProps : function () {
		return {
			title : "Are You Sure?",
			message : "This action cannot be undone.",
			cancelButtonTitle : "Cancel",
			confirmButtonTitle : "Confirm"
		};
	},

	// Render
	render : function () {
		return (
			<div className="confirm modal">
				<h2>{this.props.title}</h2>
				<p>{this.props.message}</p>
				<div className="buttons">
					<button onClick={this.props.onCancel} onTouchEnd={this.props.onCancel}>{this.props.cancelButtonTitle}</button>
					<button onClick={this.props.onConfirm} onTouchEnd={this.props.onConfirm}>{this.props.confirmButtonTitle}</button>
				</div>
			</div>
		);
	}
});

module.exports = ConfirmDialogue;