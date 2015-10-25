
import React, { Component, PropTypes } from 'react';

/*
 * templateForm takes a template prop & turns it into a form
 * where {fields} are turned into input fields
 */
class TemplateForm extends Component {
	static propTypes = {
		template : PropTypes.string.isRequired,
		name : PropTypes.string.isRequired,
		value : PropTypes.object,
		onValueChange : PropTypes.func.isRequired,
		split : PropTypes.object,
		match : PropTypes.object,
		disabled : PropTypes.bool
	}
	// ComponentLifecycle
	static defaultProps = {
		className : "templateForm",
		name : "templateForm",
		split : /({.+?})/gi,
		match : /{(.+?)}/gi,
		disabled : false
	}

	// Methods
	static defaultMatch = () => { return this.getDefaultProps().match }
	static defaultSplit = () => { return this.getDefaultProps().split }
	static stringValue = (template, values, splitRegex, matchRegex) => {
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
	}

	// EventHandlers
	onChange = (e) => {
		var o = this.props.value;
		o[e.target.name] = e.target.value;
		this.props.onValueChange(o,this.props.name);
	}

	// Render
	render() {
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
}

export default TemplateForm;