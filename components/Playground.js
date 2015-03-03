/** @jsx React.DOM */

var AutoGrowTextarea = require('./AutoGrowTextarea')
	, CronInput = require('./CronInput')
	, Clock = require('./Clock')
	, DatePicker = require('./DatePicker')
	, DateTimePicker = require('./DateTimePicker')
	, DateTimeRangePicker = require('./DateTimeRangePicker')
	, HoursInput = require('./HoursInput')
	, Map = require('./Map')
	, MarkdownEditor = require('./MarkdownEditor')
	, MarkdownText = require('./MarkdownText')
	, PriceInput = require('./PriceInput')
	, ResultsTextInput = require('./ResultsTextInput')
	, S3PhotoUploader = require('./S3PhotoUploader')
	, Select = require('./Select')
	, Signature = require('./Signature')
	, Slider = require('./Slider')
	, SlideShow = require('./SlideShow')
	, TagInput = require('./TagInput')
	, TimePicker = require('./TimePicker')
	, TimeSpanInput = require('./TimeSpanInput')
	, ValidTextInput = require('./ValidTextInput');

var components = ["TagInput","AutoGrowTextarea","Clock","DatePicker","DateTimePicker", "DateTimeRangePicker","HoursInput","Login","MarkdownEditor","MarkdownText","PriceInput","ResultsTextInput","S3PhotoUploader",
									"Select","Signature","Signup","Slider","SlideShow","TimePicker","TimeSpanInput","ValidTextInput"];

var thirtyDaysAgo = new Date()
thirtyDaysAgo.setDate(-30);
thirtyDaysAgo.setHours(18);

var foFive = new Date();
// foFive.setMinutes(25);

var Playground = React.createClass({displayName: "Playground",
	getInitialState : function () {
		return {
			component : "TimeSpanInput",
			values : {
				Clock : new Date(),
				DateTimePicker : thirtyDaysAgo,
				DateTimePickerCenter : thirtyDaysAgo,
				TagInput : ["a tag","taggie","tag","snag"],
				Select : 0,
				HoursInput : "Mo-Sa 9:00-17:00",
				DateTimeRangePicker : [new Date(), new Date()],
				TimeSpanInput : [new Date(), new Date()]
			}
		}
	},
	pickComponent : function (e) {
		var component = e.target.value;
		this.setState({ 
			component : component
		});
	},
	onValueChange : function (value, name) {
		console.log(value, name);
		var values = this.state.values
		values[name] = value;
		this.setState({ values : values });
	},
 	render : function () {
 		var options = []
 			, component;

 		components.forEach(function(c,i){
 			options.push(React.createElement("option", {key: i, value: c}, c));
 		});

 		switch (this.state.component) {
 		case "AutoGrowTextarea":
 			component = React.createElement(AutoGrowTextarea, {placeholder: "text"})
 			break;
		case "Clock":
			component = React.createElement(Clock, null)
			break;
		case "DatePicker":
			component = React.createElement(DatePicker, null)
			break;
		case "DateTimeRangePicker":
			component = React.createElement(DateTimeRangePicker, {name: "DateTimePicker", value: this.state.values.DateTimeRangePicker, onValueChange: this.onValueChange})
			break;
		case "HoursInput":
			component = React.createElement(HoursInput, {name: "HoursInput", value: this.state.values.HoursInput, onValueChange: this.onValueChange})
			break;
		case "Login":
			component = React.createElement(Login, null)
			break;
		case "MarkdownEditor":
			component = React.createElement(MarkdownEditor, null)
			break;
		case "MarkdownText":
			component = React.createElement(MarkdownText, null)
			break;
		case "PriceInput":
			component = React.createElement(PriceInput, null)
			break;
		case "ResultsTextInput":
			component = React.createElement(ResultsTextInput, null)
			break;
		case "S3PhotoUploader":
			component = React.createElement(S3PhotoUploader, null)
			break;
		case "Signature":
			component = React.createElement(Signature, null)
			break;
		case "Signup":
			component = React.createElement(Signup, null)
			break;
		case "TimePicker":
			component = React.createElement(TimePicker, null)
			break;
		case "TimeSpanInput":
			component = React.createElement(TimeSpanInput, {name: "TimeSpanInput", value: this.state.values.TimeSpanInput, onValueChange: this.onValueChange})
			break;
		case "TagInput":
			component = React.createElement(TagInput, {name: "TagInput", value: this.state.values.TagInput, onValueChange: this.onValueChange})
			break;
		case "DateTimePicker":
			component = React.createElement(DateTimePicker, {name: "DateTimePicker", value: this.state.values.DateTimePicker, centerDate: this.state.values.DateTimePickerCenter, onValueChange: this.onValueChange})
			break;
		case "ValidTextInput":
			component = React.createElement(ValidTextInput, {label: "valid text field", placeholder: "stuff", valid: false})
			break;
		case "SlideShow":
			var slides = [
					"http://i.imgur.com/vdiCQB2.jpg",
					"http://i.imgur.com/6YS1sqT.jpg",
					"http://i.imgur.com/YSD5Now.jpg",
					"http://i.imgur.com/QSImV2B.jpg",
					"http://i.imgur.com/iQXytyM.jpg"
				]
			component = React.createElement(SlideShow, {slides: slides})
			break;
		case "Slider":
			component = React.createElement(Slider, null)
			break;
		case "Select":
			var opts = [
				[0,"groceries"],
				[1,"apples"],
				[2,"bananas"],
				[3,"oranges"],
				[4,"dates"],
				[5,"prunes"]
			];
			component = React.createElement(Select, {name: "Select", value: this.state.values.Select, options: opts, onValueChange: this.onValueChange})
			break;
 		}
		return (
			React.createElement("div", {className: "components playground"}, 
				React.createElement("header", null, 
					React.createElement("div", {className: "content"}, 
						React.createElement("h1", null, "Component Playground"), 
						React.createElement("select", {value: this.state.component, onChange: this.pickComponent}, 
							options
						), 
						React.createElement("h3", {className: "title"}, "Component: ", this.state.component)
					)
				), 
				React.createElement("div", {className: "component"}, 
					React.createElement("div", {className: "wrapper"}, 
						component
					)
				)
			)
		);
	}
});

window.playground = Playground;
module.exports = Playground;