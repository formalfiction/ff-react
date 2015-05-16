/** @jsx React.DOM */


/*
 * templateForm takes a template prop & turns it into a form
 * where {fields} are turned into input fields
 */
var TemplateForm = React.createClass({
	propTypes : {
		template : React.PropTypes.string.isRequired,
		name : React.PropTypes.string.isRequired,
		value : React.PropTypes.object,
		onValueChange : React.PropTypes.func.isRequired,
		split : React.PropTypes.object,
		match : React.PropTypes.object,
	},

	// ComponentLifecycle
	getDefaultProps : function () {
		return {
			className : "templateForm",
			name : "templateForm",
			split : /({.+?})/gi,
			match : /{(.+?)}/gi
		}
	},

	// Methods
	stringValue : function () {
		var str = ""
			, split = this.props.template.split(this.props.split);

		for (var i=0, el; el=split[i]; i++) {
			var match = this.props.match.exec(el);
			if (match) {
				match = match[1];
				str += this.props.value[match] || "";
			} else {
				str += el;
			}
		}

		return str;
	},

	// EventHandlers
	onChange : function (e) {
		var o = this.props.value;
		o[e.target.name] = e.target.value;
		console.log(this.stringValue());
		this.props.onValueChange(o,this.props.name);
	},

	// Render
	render : function () {
		var markup = []
			, split = this.props.template.split(this.props.split);

		for (var i=0, el; el=split[i]; i++) {
			var match = this.props.match.exec(el);
			if (match) {
				match = match[1];
				markup.push(<input key={i} type="text" name={match} placeholder={match} value={this.props.value[match]} onChange={this.onChange} />);
			} else {
				markup.push(<span key={i}>{el}</span>);
			}
		}

		return (
			<div className={this.props.className}>
				{markup}
			</div>
		);
	}
});

module.exports = TemplateForm;