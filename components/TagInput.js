/*
 *	TagInput is an autogrow text area
 */

var TagInput = React.createClass({
	propTypes : {
		separator : React.PropTypes.string.isRequired
	},

	// Lifecycle
	getDefaultProps : function () {
		return {
			separator : ","
		}
	},

	// Event handler
	onChange : function (e) {

	},

	// Render
	render : function () {
		return (
			<div contentEditable="true" onChange={this.onChange}>

			</div>
		)
	}
});

module.exports = TagInput;