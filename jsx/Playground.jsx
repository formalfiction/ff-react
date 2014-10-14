/** @jsx React.DOM */

var Clock = require('./Clock')
	, DatePicker = require('./DatePicker')
	, Login = require('./Login')
	, Map = require('./Map')
	, MarkdownEditor = require('./MarkdownEditor')
	, MarkdownText = require('./MarkdownText')
	, PriceInput = require('./PriceInput')
	, ResultsTextInput = require('./ResultsTextInput')
	, S3PhotoUploader = require('./S3PhotoUploader')
	, Signature = require('./Signature')
	, Signup = require('./Signup')
	, TimePicker = require('./TimePicker')
	, DateTimePicker = require('./DateTimePicker')
	, ValidTextInput = require('./ValidTextInput');


var components = ["Clock","DatePicker","Login","MarkdownEditor","MarkdownText","PriceInput","ResultsTextInput","S3PhotoUploader","Signature","Signup","TimePicker","DateTimePicker", "ValidTextInput"];

var thirtyDaysAgo = new Date()
thirtyDaysAgo.setDate(-30);

var Playground = React.createClass({
	getInitialState : function () {
		return {
			component : "DateTimePicker",
			values : {
				Clock : new Date(),
				DateTimePicker : thirtyDaysAgo,
				DateTimePickerCenter : new Date(thirtyDaysAgo)
			}
		}
	},
	pickComponent : function (e) {
		var component = e.target.value;
		this.setState({ 
			component : component
		});
	},
	valueChanger : function (name) {
		var self = this;
		return function (v) {
			var values = self.state.values
			values[name] = v.value
			self.setState({ values : values });
		}
	},
 	render : function () {
 		var options = []
 			, component;

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
		case "DateTimePicker":
			component = <DateTimePicker name="name" value={this.state.values.DateTimePicker} centerDate={this.state.values.DateTimePickerCenter} onChange={this.valueChanger('DateTimePicker')} />
			break;
		case "ValidTextInput":
			component = <ValidTextInput label="valid text field" placeholder="stuff" valid={false} />
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