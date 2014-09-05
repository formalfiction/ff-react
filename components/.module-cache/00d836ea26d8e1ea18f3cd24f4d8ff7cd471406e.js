/** @jsx React.DOM */

var ClientStore = require('../stores/ClientStore')
	, ClientActions = require('../actions/ClientActions');

var ClientItem = React.createClass({displayName: 'ClientItem',
	handleClick : function () {
		ClientActions.toClient(this.props.client.id);
	},
	render : function () {
		var client = this.props.client;
		return (
			React.DOM.div( {className:"client item span5"}, 
				React.DOM.h3(null, React.DOM.a( {onTouchEnd:this.handleClick, onClick:this.handleClick}, client.name || "unnamed client" ))
			)
		);
	}
});

var Clients = React.createClass({displayName: 'Clients',
	componentWillMount : function () {
		if (!ClientStore.all().length) {
			ClientActions.fetchAll();
		}
		ClientStore.onChange(this.handleChange);
	},
	componentWillUnmount : function () {
		ClientStore.offChange(this.handleChange);
	},
	getInitialState : function () {
		return {
			clients : ClientStore.all()
		}
	},
	handleChange : function () {
		this.setState({
			clients : ClientStore.all()
		})
	},
	newClient : function () {
		ClientActions.newClient();
	},
	render : function () {
		var clients = [];
		this.state.clients.forEach(function (client){
			clients.push(ClientItem( {client:client, key:client.id} ))
		});

		return (
			React.DOM.div( {className:"list-container"}, 
				React.DOM.h2( {className:"span2"}, "Clients"),
				React.DOM.div( {className:"clear"}),
				React.DOM.button( {className:"span2", onClick:this.newClient}, "New"),
				React.DOM.div( {className:"clear"}),
				React.DOM.div( {className:"clients list"}, 
					clients
				)
			)
		);
	}
});

module.exports = Clients;