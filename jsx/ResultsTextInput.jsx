/** @jsx React.DOM */
var React = require('React');

var ReactPropTypes = React.PropTypes
	, KeyCodes = require('../constants/KeyCodes');


var ResultsTextInput = React.createClass({
  propTypes: {
    search : ReactPropTypes.func.isRequired,
    onSelect : ReactPropTypes.func.isRequired,

    className: ReactPropTypes.string,
    id: ReactPropTypes.string,
    placeholder: ReactPropTypes.string,
    onChange : ReactPropTypes.func,
    value: ReactPropTypes.string,
  },
	getInitialState : function () {
		return {
			value : this.props.value || '',
			results : this.props.results || [],
			selectedIndex : 0,
			loading : false
		}
	},
  /**
   * Invokes the callback passed in as onSave, allowing this component to be
   * used in different ways.
   */
  _save: function() {

  },

  /**
   * @param {object} event
   */
  _onChange: function(e) {
  	var self = this;
    self.setState({
      value: e.target.value,
      loading : true
    });

    if (e.target.value !== "") {
	    this.props.search(e.target.value, function (results){
	    	self.setState({
	    		results : results,
	    		loading : false
	    	});
	    });
	  } else {
	  	self.setState({
	  		results : []
	  	})
	  }
  },

  /**
   * @param  {object} event
   */
  _onKeyDown: function(e) {
    if (e.keyCode === KeyCodes.enter) {
      this._save();
    } else if (e.keyCode === KeyCodes.down) {
    	if (this.state.selectedIndex < this.state.results.length - 1) {
    		this.setState({
    			selectedIndex : this.state.selectedIndex + 1
    		});
    	}
    } else if (e.keyCode === KeyCodes.up) {
    	if (this.state.selectedIndex > 0) {
    		this.setState({
    			selectedIndex : this.state.selectedIndex - 1
    		})
    	}
    }
  },
	render : function () {
		var self = this
			, results = [];

		this.state.results.forEach(function (result, i){
			var selected = (i == self.state.selectedIndex) ? "selected" : "";
			results.push(
				<li key={i} className={selected}>{result.name}</li>
			);
		});

		return (
			<div className="resultsTextInput">
	      <input
	        className={this.props.className}
	        id={this.props.id}
	        placeholder={this.props.placeholder}
	        onChange={this._onChange}
	        onKeyDown={this._onKeyDown}
	        value={this.state.value}
	        autoFocus={true} />
	      <ul className="results">
	      	{results}
	      </ul>
      </div>
		);
	},
});

module.exports = ResultsTextInput;