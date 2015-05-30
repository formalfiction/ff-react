/** @jsx React.DOM */

var CronInput = require('./CronInput')
	, Clock = require('./Clock')
	, DatePicker = require('./DatePicker')
	, DateTimePicker = require('./DateTimePicker')
	, DateTimeRangePicker = require('./DateTimeRangePicker')
	, HoursInput = require('./HoursInput')
	, LoadingTouchButton = require('./LoadingTouchButton')
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
	, TouchAnchor = require('./TouchAnchor')
	, TouchButton = require('./TouchButton')
	, TagInput = require('./TagInput')
	, TemplateForm = require('./TemplateForm')
	, TimePicker = require('./TimePicker')
	, TimeSpanInput = require('./TimeSpanInput')
	, ValidTextInput = require('./ValidTextInput')
	, ValidTextareaInput = require('./ValidTextareaInput');

var components = ["Clock","DatePicker","DateTimePicker", "DateTimeRangePicker","HoursInput","LoadingTouchButton","MarkdownEditor","MarkdownText","PriceInput","ResultsTextInput","S3PhotoUploader",
									"Select","Signature","Signup","Slider","SlideShow","TagInput","TemplateForm","TimePicker","TimeSpanInput", "TouchButton","ValidTextInput","ValidTextareaInput"];

var thirtyDaysAgo = new Date()
thirtyDaysAgo.setDate(-30);
thirtyDaysAgo.setHours(18);

var foFive = new Date();
// foFive.setMinutes(25);

var Playground = React.createClass({
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
				TimeSpanInput : [new Date(), new Date()],
				ValidTextareaInput : "huh? asdfkljhads flkjhasfa \n asdfasfdas df \n werd.",
				TemplateForm : {}
			},
			loading : false
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
	onToggleLoading : function () {
		this.setState({ loading : !this.state.loading });
	},
 	render : function () {
 		var options = []
 			, component, extras;

 		components.forEach(function(c,i){
 			options.push(<option key={i} value={c}>{c}</option>);
 		});

 		switch (this.state.component) {
		case "Clock":
			component = <Clock />
			break;
		case "DatePicker":
			component = <DatePicker />
			break;
		case "DateTimeRangePicker":
			component = <DateTimeRangePicker name="DateTimePicker" value={this.state.values.DateTimeRangePicker} onValueChange={this.onValueChange} />
			break;
		case "HoursInput":
			component = <HoursInput name="HoursInput" value={this.state.values.HoursInput} onValueChange={this.onValueChange} />
			break;
		case "LoadingTouchButton":
			extras = <p><TouchAnchor onClick={this.onToggleLoading} text="toggle loading" /></p>
			component = <LoadingTouchButton loading={this.state.loading} onClick={this.onToggleLoading} />
			break;
		case "MarkdownEditor":
			component = <MarkdownEditor />
			break;
		case "MarkdownText":
			component = <MarkdownText />
			break;
		case "PriceInput":
			component = <PriceInput />
			break;
		case "ResultsTextInput":
			component = <ResultsTextInput />
			break;
		case "S3PhotoUploader":
			component = <S3PhotoUploader />
			break;
		case "Signature":
			component = <Signature />
			break;
		case "Signup":
			component = <Signup />
			break;
		case "TagInput":
			component = <TagInput name="TagInput" value={this.state.values.TagInput} onValueChange={this.onValueChange} />
			break;
		case "TemplateForm":
			component = <TemplateForm name="TemplateForm" template="mary {had} a little {lamb} whos fleece was white as {snow}!" value={this.state.values.TemplateForm} onValueChange={this.onValueChange} />
			break;
		case "TimePicker":
			component = <TimePicker />
			break;
		case "TimeSpanInput":
			component = <TimeSpanInput name="TimeSpanInput" value={this.state.values.TimeSpanInput} onValueChange={this.onValueChange} />
			break;
		case "TouchButton":
			component = <TouchButton name="TouchButton" text="Button" />
			break;
		case "DateTimePicker":
			component = <DateTimePicker name="DateTimePicker" value={this.state.values.DateTimePicker} centerDate={this.state.values.DateTimePickerCenter} onValueChange={this.onValueChange} />
			break;
		case "ValidTextInput":
			component = <ValidTextInput label="valid text field" placeholder="stuff" valid={false} />
			break;
		case "SlideShow":
			var slides = [
					"http://i.imgur.com/vdiCQB2.jpg",
					"http://i.imgur.com/6YS1sqT.jpg",
					"http://i.imgur.com/YSD5Now.jpg",
					"http://i.imgur.com/QSImV2B.jpg",
					"http://i.imgur.com/iQXytyM.jpg"
				]
			component = <SlideShow slides={slides} />
			break;
		case "Slider":
			component = <Slider />
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
			component = <Select name="Select" value={this.state.values.Select} options={opts} onValueChange={this.onValueChange} />
			break;
		case "ValidTextareaInput":
			component = <ValidTextareaInput id="ValidTextArea" label="Text Area Input" value={this.state.values.ValidTextareaInput} name="ValidTextareaInput" onValueChange={this.onValueChange} />
			break;
 		}
		return (
			<div className="components playground">
				<header>
					<div className="content">
						<h1>Component Playground</h1>
						<select value={this.state.component} onChange={this.pickComponent}>
							{options}
						</select>
						<h3 className="title">Component: {this.state.component}</h3>
					</div>
				</header>
				<div className="component">
					<div className="extras">
						{extras}
					</div>
					<div className="wrapper">
						{component}
					</div>
				</div>
			</div>
		);
	}
});

window.playground = Playground;
module.exports = Playground;