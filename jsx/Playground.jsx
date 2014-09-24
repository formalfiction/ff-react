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
	, DateTimePicker = require('./DateTimePicker');


var components = ["Clock","DatePicker","Login","MarkdownEditor","MarkdownText","PriceInput","ResultsTextInput","S3PhotoUploader","Signature","Signup","TimePicker","DateTimePicker"];

var Playground = React.createClass({
	getInitialState : function () {
		return {
			component : "DateTimePicker"
		}
	},
	pickComponent : function (e) {
		var component = e.target.value;
		this.setState({ 
			component : component
		});
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
			component = <DateTimePicker />
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