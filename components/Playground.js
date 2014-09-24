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

var Playground = React.createClass({displayName: 'Playground',
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
 			options.push(React.DOM.option( {key:i, value:c}, c));
 		});

 		switch (this.state.component) {
		case "Clock":
			component = Clock(null )
			break;
		case "DatePicker":
			component = DatePicker(null )
			break;
		case "Login":
			component = Login(null )
			break;
		case "MarkdownEditor":
			component = MarkdownEditor(null )
			break;
		case "MarkdownText":
			component = MarkdownText(null )
			break;
		case "PriceInput":
			component = PriceInput(null )
			break;
		case "ResultsTextInput":
			component = ResultsTextInput(null )
			break;
		case "S3PhotoUploader":
			component = S3PhotoUploader(null )
			break;
		case "Signature":
			component = Signature(null )
			break;
		case "Signup":
			component = Signup(null )
			break;
		case "TimePicker":
			component = TimePicker(null )
		case "DateTimePicker":
			component = DateTimePicker(null )
			break;
 		}
		return (
			React.DOM.div( {className:"components playground"}, 
				React.DOM.h1(null, "Component Playground"),
				React.DOM.select( {value:this.state.component, onChange:this.pickComponent}, 
					options
				),
				React.DOM.hr(null ),
				React.DOM.div( {className:"component"}, 
					React.DOM.h3( {className:"title"}, this.state.component),
					React.DOM.div( {className:"wrapper"}, 
						component
					)
				)
			)
		);
	}
});

window.playground = Playground;
module.exports = Playground;