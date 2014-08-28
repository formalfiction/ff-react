/** @jsx React.DOM */

var ClientStore = require('../stores/ClientStore')
	, ClientActions = require('../actions/ClientActions');

var ClientItem = React.createClass({
	handleClick : function () {
		ClientActions.toClient(this.props.client.id);
	},
	render : function () {
		var client = this.props.client;
		return (
			<div className="client item span5">
				<h3><a onTouchEnd={this.handleClick} onClick={this.handleClick}>{client.name || "unnamed client" }</a></h3>
			</div>
		);
	}
});

var Clients = React.createClass({
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
			clients.push(<ClientItem client={client} key={client.id} />)
		});

		return (
			<div className="list-container">
				<h2 className="span2">Clients</h2>
				<div className="clear"></div>
				<button className="span2" onClick={this.newClient}>New</button>
				<div className="clear"></div>
				<div className="clients list">
					{clients}
				</div>
			</div>
		);
	}
});

module.exports = Clients;