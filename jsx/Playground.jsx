/** @jsx React.DOM */

var AutoGrowTextarea = require('./AutoGrowTextarea')
	, Clock = require('./Clock')
	, DatePicker = require('./DatePicker')
	, DateTimePicker = require('./DateTimePicker')
	, Map = require('./Map')
	, MarkdownEditor = require('./MarkdownEditor')
	, MarkdownText = require('./MarkdownText')
	, PriceInput = require('./PriceInput')
	, ResultsTextInput = require('./ResultsTextInput')
	, S3PhotoUploader = require('./S3PhotoUploader')
	, Signature = require('./Signature')
	, TagInput = require('./TagInput')
	, TimePicker = require('./TimePicker')
	, ValidTextInput = require('./ValidTextInput')
	, Slider = require('./Slider');

var components = ["TagInput","AutoGrowTextarea","Clock","DatePicker","Login","MarkdownEditor","MarkdownText","PriceInput","ResultsTextInput","S3PhotoUploader","Signature","Signup","TimePicker","DateTimePicker", "ValidTextInput", "Slider"];

var thirtyDaysAgo = new Date()
thirtyDaysAgo.setDate(-30);
thirtyDaysAgo.setHours(18);

var Playground = React.createClass({
	getInitialState : function () {
		return {
			component : "Slider",
			values : {
				Clock : new Date(),
				DateTimePicker : thirtyDaysAgo,
				DateTimePickerCenter : thirtyDaysAgo,
				TagInput : ["a tag","taggie","tag","snag"],
				slides : [
					"http://i.imgur.com/vdiCQB2.jpg",
					"http://i.imgur.com/6YS1sqT.jpg",
					"http://i.imgur.com/YSD5Now.jpg",
					"http://i.imgur.com/QSImV2B.jpg",
					"http://i.imgur.com/iQXytyM.jpg"
				]
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
		var values = this.state.values
		values[name] = value;
		console.log(value);
		this.setState({ values : values });
	},
 	render : function () {
 		var options = []
 			, component;

 		components.forEach(function(c,i){
 			options.push(<option key={i} value={c}>{c}</option>);
 		});

 		switch (this.state.component) {
 		case "AutoGrowTextarea":
 			component = <AutoGrowTextarea placeholder="text" />
 			break;
		case "Clock":
			component = <Clock />
			break;
		case "DatePicker":
			component = <DatePicker />
			break;
		case "Login":
			component = <Login />
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
		case "TimePicker":
			component = <TimePicker />
			break;
		case "TagInput":
			component = <TagInput name="TagInput" value={this.state.values.TagInput} onValueChange={this.onValueChange} />
			break;
		case "DateTimePicker":
			component = <DateTimePicker name="DateTimePicker" value={this.state.values.DateTimePicker} centerDate={this.state.values.DateTimePickerCenter} onValueChange={this.onValueChange} />
			break;
		case "ValidTextInput":
			component = <ValidTextInput label="valid text field" placeholder="stuff" valid={false} />
			break;
		case "Slider":
			component = <Slider slides={this.state.values.slides} />
			break;
 		}
		return (
			<div className="components playground">
				<h1>Component Playground</h1>
				<select value={this.state.component} onChange={this.pickComponent}>
					{options}
				</select>
				<hr />
				<div className="component">
					<h3 className="title">{this.state.component}</h3>
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