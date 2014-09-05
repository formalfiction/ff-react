/** @jsx React.DOM */
/*
 * TimePicker Pairs the Clock Component with an
 * input field.
 * 
 */

var Clock = require('./Clock');

var TimePicker = React.createClass({displayName: 'TimePicker',
	hours 	: ["01","02","03","04","05","06","07","08","09","10","11","12"],
	minutes : ["00","15","30","45"],
	phase 	: ["am","pm"],
	getInitialState : function () {
		return {
			focused : false
		}
	},
	// return a string representation of the time
	_stringValue : function () {
		var val = this.props.value;
		// if no initial value return blank string
		if (!val) {
			return ""
		}
		
		if (typeof val === "number") {
			val = new Date(val)
		}

		var h = val.getHours()
			, ph = (h <= 12) ? 0 : 1
			, m = (15 * Math.round(val.getMinutes() / 15)) / 15;

		// if we're in the aft, minus 12 to de-militarize time
		if (ph === 1) {
			h = h - 12;
		}

		return this.hours[(h === 0) ? h : h - 1] + ":" + this.minutes[m] + " " + this.phase[ph]
	},
	_focus : function () {
		this.setState({ focused : true });
	},
	_blur : function () {
		this.setState({ focused : false });
	},
	_fakeFn : function () { },
	// Clicks on the clock div should maintain focus on the element
	_clockMouseDown : function (e) {
		e.preventDefault();
		// Cancel Blur event triggered by clicking the clock
		$(this.refs["field"].getDOMNode()).focus();
		return false;
	},
	_clockChange : function (value) {
		if (typeof this.props.onChange === "function") {
			this.props.onChange({
				name : this.props.name,
				value : value
			});
		}
	},
	render : function () {
		var time
			, display = this._stringValue();

		// if (this.refs["field"]) {
		// 	if ($(this.refs["field"]).is(":focus")) {
		if (this.state.focused) {
			time = Clock( {onMouseDown:this._clockMouseDown, value:this.props.value, onChange:this._clockChange} )	
		}

		return (
			React.DOM.div( {className:"timePicker field"}, 
				React.DOM.label(null, this.props.label),
				React.DOM.input( {ref:"field", value:display, onChange:this._fakeFn, onFocus:this._focus, onBlur:this._blur}),
				time
			)
		)
	}
});

module.exports = TimePicker;