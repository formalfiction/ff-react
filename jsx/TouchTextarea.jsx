/** @jsx React.DOM */

var mountTime;

var TouchTextarea = React.createClass({
	propTypes : {
		// default height for the field
		defaultHeight : React.PropTypes.number,
		// you should probably name yo fields
		name : React.PropTypes.string.isRequired,
		// value of the field
		value : React.PropTypes.string.isRequired,
		// a delay (in ms) before the component will respond.
		// good for when ui is changing under a ghost click
		initialInputDelay : React.PropTypes.number,
		// if true, the textarea will automatically grow
		// to match the height of the text it contains
		autoGrow : React.PropTypes.bool,
		// Use either onChange, or onValueChange. Not both.
		// Raw change event
		onChange : React.PropTypes.func,
		// change handler in the form (value, name)
		onValueChange : React.PropTypes.func,
	},

	// Lifecycle
	getDefaultProps : function () {
		return {
			name : "textarea",
			initialInputDelay : 300,
			autoGrow : true,
			defaultHeight : 30,
		}
	},
	getInitialState : function () {
		return {
			height : 0
		}
	},
	componentDidMount : function () {
		mountTime = new Date();
		this.setHeight();
	},

	// Methods
	setHeight : function () {
		var el = this.getDOMNode();
		if (this.props.autoGrow) {
			// set the height to 1px before rendering
			el.setAttribute('style', "height : 1px");
			var newHeight = el.scrollHeight;

			if (newHeight != this.state.height) {
				this.setState({ height : newHeight });
			}

			el.setAttribute('style', "height : " + this.state.height + "px");
		}
	},

	// Event Handlers
	onChange : function (e) {
		var value = e.target.value;
		
		this.setHeight();

		if (typeof this.props.onChange === "function") {
			this.props.onChange(e);
		} else if (typeof this.props.onValueChange === "function") {
			this.props.onValueChange(value, this.props.name);
		}
	},
	onMouseDown : function (e) {

		if (new Date().valueOf() < (mountTime.valueOf() + this.props.initialInputDelay)) {
			e.preventDefault();
			e.stopPropagation();
			return;
		}

		if (typeof this.props.onMouseDown === "function") {
			this.props.onMouseDown(e);
		}
	},

	// Render
	style : function () {
		return {
			height : (this.state.height || this.props.defaultHeight)
		}
	},

	render : function () {
		return (
			<textarea {...this.props} style={this.style()} onChange={this.onChange} onMouseDown={this.onMouseDown} value={this.props.value} />
		);
	}
});

module.exports = TouchTextarea;