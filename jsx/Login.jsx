/*
 * Basic Login Component.
 *
 * @jsx React.DOM
 */

var UserActions = require('../actions/UserActions');

var Login = React.createClass({
	handleLogin : function () {
		
	},
	render : function () {
		return (
			<div class="smallForm">
				<div id="logo"><img src="/svg/logo.svg" /></div>
				<form class="login" method="POST" action="/login">
					<h3>Login:</h3>
					<input type="text" name="username" placeholder="username" />
					<input type="password" name="password" placeholder="password" />
					<button type="submit">Login</button>
				</form>
				<hr />
				<a href="/signup"><button>Signup</button></a>
			</div>
		);
	}
});

module.exports = Login;