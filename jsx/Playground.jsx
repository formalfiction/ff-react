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
	, TimePicker = require('./TimePicker');

var Playground = React.createClass({
	render : function () {
		return (
			<div className="components playground">
				<h1>Component Playground</h1>
				<div className="component">
					<h3 className="title">Clock</h3>
					<div className="wrapper">
						<Clock />
					</div>
				</div>
				<div className="component">
					<h3 className="title">Date Picker</h3>
					<div className="wrapper">
						<DatePicker />
					</div>
				</div>
				<div className="component">
					<h3 className="title">Login</h3>
					<div className="wrapper">
						<Login />
					</div>
				</div>
				<div className="component">
					<h3 className="title">Map</h3>
					<div className="wrapper">
						<Map />
					</div>
				</div>
				<div className="component">
					<h3 className="title">MarkdownEditor</h3>
					<div className="wrapper">
						<MarkdownEditor />
					</div>
				</div>
				<div className="component">
					<h3 className="title">MarkdownText</h3>
					<div className="wrapper">
						<MarkdownText />
					</div>
				</div>
				<div className="component">
					<h3 className="title">PriceInput</h3>
					<div className="wrapper">
						<PriceInput />
					</div>
				</div>
				<div className="component">
					<h3 className="title">Results Text Input</h3>
					<div className="wrapper">
						<ResultsTextInput />
					</div>
				</div>
				<div className="component">
					<h3 className="title">S3PhotoUploader</h3>
					<div className="wrapper">
						<S3PhotoUploader />
					</div>
				</div>
				<div className="component">
					<h3 className="title">Signature</h3>
					<div className="wrapper">
						<Signature />
					</div>
				</div>
				<div className="component">
					<h3 className="title">Signup</h3>
					<div className="wrapper">
						<Signup />
					</div>
				</div>
				<div className="component">
					<h3 className="title">TimePicker</h3>
					<div className="wrapper">
						<TimePicker />
					</div>
				</div>
			</div>
		);
	}
});

window.playground = Playground;
module.exports = Playground;