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
		disabled : React.PropTypes.bool
	},

	// ComponentLifecycle
	getDefaultProps : function () {
		return {
			className : "templateForm",
			name : "templateForm",
			split : /({.+?})/gi,
			match : /{(.+?)}/gi,
			disabled : false
		}
	},

	// Methods
	statics : {
		defaultMatch : function () { return this.getDefaultProps().match },
		defaultSplit : function () { return this.getDefaultProps().split },
		stringValue : function (template, values, splitRegex, matchRegex) {
			matchRegex || (matchRegex = TemplateForm.defaultMatch())
			splitRegex || (splitRegex = TemplateForm.defaultSplit())
			values || (values = {})

			var str = ""
				, split = template.split(splitRegex);

			for (var i=0, el; el=split[i]; i++) {
				var match = matchRegex.exec(el);
				if (match) {
					var m = values[match[1]] || "";
					str += "{" + m + "}";
				} else {
					str += el;
				}
			}

			return str;
		},
	},

	// EventHandlers
	onChange : function (e) {
		var o = this.props.value;
		o[e.target.name] = e.target.value;
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
				markup.push(<input  key={i}
														type="text"
														name={match}
														placeholder={match}
														value={this.props.value[match]}
														onChange={this.onChange}
														disabled={this.props.disabled} />);
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