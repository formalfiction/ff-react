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

var Playground = React.createClass({displayName: 'Playground',
	render : function () {
		return (
			React.DOM.div( {className:"components playground"}, 
				React.DOM.h1(null, "Component Playground"),
				React.DOM.div( {className:"component"}, 
					React.DOM.h3( {className:"title"}, "Clock"),
					React.DOM.div( {className:"wrapper"}, 
						Clock(null )
					)
				),
				React.DOM.div( {className:"component"}, 
					React.DOM.h3( {className:"title"}, "Date Picker"),
					React.DOM.div( {className:"wrapper"}, 
						DatePicker(null )
					)
				),
				React.DOM.div( {className:"component"}, 
					React.DOM.h3( {className:"title"}, "Login"),
					React.DOM.div( {className:"wrapper"}, 
						Login(null )
					)
				),
				React.DOM.div( {className:"component"}, 
					React.DOM.h3( {className:"title"}, "Map"),
					React.DOM.div( {className:"wrapper"}, 
						Map(null )
					)
				),
				React.DOM.div( {className:"component"}, 
					React.DOM.h3( {className:"title"}, "MarkdownEditor"),
					React.DOM.div( {className:"wrapper"}, 
						MarkdownEditor(null )
					)
				),
				React.DOM.div( {className:"component"}, 
					React.DOM.h3( {className:"title"}, "MarkdownText"),
					React.DOM.div( {className:"wrapper"}, 
						MarkdownText(null )
					)
				),
				React.DOM.div( {className:"component"}, 
					React.DOM.h3( {className:"title"}, "PriceInput"),
					React.DOM.div( {className:"wrapper"}, 
						PriceInput(null )
					)
				),
				React.DOM.div( {className:"component"}, 
					React.DOM.h3( {className:"title"}, "Results Text Input"),
					React.DOM.div( {className:"wrapper"}, 
						ResultsTextInput(null )
					)
				),
				React.DOM.div( {className:"component"}, 
					React.DOM.h3( {className:"title"}, "S3PhotoUploader"),
					React.DOM.div( {className:"wrapper"}, 
						S3PhotoUploader(null )
					)
				),
				React.DOM.div( {className:"component"}, 
					React.DOM.h3( {className:"title"}, "Signature"),
					React.DOM.div( {className:"wrapper"}, 
						Signature(null )
					)
				),
				React.DOM.div( {className:"component"}, 
					React.DOM.h3( {className:"title"}, "Signup"),
					React.DOM.div( {className:"wrapper"}, 
						Signup(null )
					)
				),
				React.DOM.div( {className:"component"}, 
					React.DOM.h3( {className:"title"}, "TimePicker"),
					React.DOM.div( {className:"wrapper"}, 
						TimePicker(null )
					)
				)
			)
		);
	}
});

window.playground = Playground;
module.exports = Playground;