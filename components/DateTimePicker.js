/** @jsx React.DOM */

var iScroll = require('../deps/iscroll');

var WheelPicker = React.createClass({displayName: 'WheelPicker',
	dragStart : function () {

	},
	dragStop : function () {

	},
	componentDidMount : function () {
		var options = {
			mouseWheel : true
		};
		this.dayScroll = new iScroll(this.refs.day.getDOMNode(), options);
		this.hourScroll = new iScroll(this.refs.hour.getDOMNode(), options);
		this.minuteScroll = new iScroll(this.refs.minute.getDOMNode(), options);
		this.phaseScroll = new iScroll(this.refs.phase.getDOMNode(), options);
	},
	render : function () {
		return (
			React.DOM.div( {className:"picker", onMouseDown:this.props.onMouseDown}, 
				React.DOM.div( {ref:"day", className:"day segment"}, 
					React.DOM.ul(null, 
						React.DOM.li(null, "Monday. Sept. 9th"),
						React.DOM.li(null, "Tues. Sept. 20th"),
						React.DOM.li(null, "Wed. Sept. 21st"),
						React.DOM.li(null, "Thur. Sept. 22nd"),
						React.DOM.li(null, "Friday. Sept. 23rd")
					)
				),
				React.DOM.div( {ref:"hour", className:"hour segment"}, 
					React.DOM.ul(null, 
						React.DOM.li(null, "10"),
						React.DOM.li(null, "11"),
						React.DOM.li(null, "12")
					)
				),
				React.DOM.div( {ref:"minute", className:"minute segment"}, 
					React.DOM.ul(null, 
						React.DOM.li(null, "00"),
						React.DOM.li(null, "15"),
						React.DOM.li(null, "30")
					)
				),
				React.DOM.div( {ref:"phase", className:"phase segment"}, 
					React.DOM.ul(null, 
						React.DOM.li(null, "am"),
						React.DOM.li(null, "pm")
					)
				)
			)
		);
	}
});

var DateTimePicker = React.createClass({displayName: 'DateTimePicker',
	getInitialState : function () {
		return {
			focused : false
		}
	},
	stringValue : function (value) {
		if (!value) { return ""; }
		date = this.dateValue(value);
		return months[date.getMonth()]  + " " + date.getDate() + " " + date.getFullYear();
	},
	_focus : function (e) {
		this.setState({ focused : true });
	},
	_blur : function (e) {
		this.setState({ focused : false });
	},
	_change : function (value) {
		if (typeof this.props.onChange === "function") {
			this.props.onChange({
				name : this.props.name,
				value : value
			});
		}
	},
	_inputChange : function (e) {
		this._change();
	},
	_pickerChange : function (val) {
		this._change(val);
		this.setState({ focused  : false });
	},
	// Cancel Blur event triggered by clicking the picker
	_pickerMouseDown : function (e) {
		e.preventDefault();
		$(this.refs["field"].getDOMNode()).focus();
		return false;
	},
	// Conform Various date inputs to a valid date object
	dateValue : function (value) {
		var isDate = (Object.prototype.toString.call(value) === "[object Date]");
		// Ensure Value is a valid date.
		if (!isDate) {
			if (typeof value === "number" && value != NaN) {
				value = new Date(this.props.value)
			} else {
				value = new Date()
				value = new Date(value.getFullYear(),value.getMonth(),01,0,0,0,0)
			}
		}

		return value;
	},
	render : function () {
		var value = this.props.value
			, stringValue = this.stringValue(value)
			, picker;

		if (this.state.focused) { 
			picker = WheelPicker( {onMouseDown:this._pickerMouseDown, value:this.props.value, onChange:this._pickerChange} )
		}

		return (
			React.DOM.div( {className:"dateTimePicker"}, 
				React.DOM.input( {ref:"field", type:"text", onClick:this._focus, onTouchEnd:this._focus, onFocus:this._focus, onBlur:this._blur, value:stringValue, onChange:this._inputChange} ),
				picker
			)
		);
	}
});

module.exports = DateTimePicker;