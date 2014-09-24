/** @jsx React.DOM */
/*
 * Basic Signup Page
 *
 */

var Signup = React.createClass({
	handleSignup : function (e) {
		e.preventDefault();
		return false;
	},
	render : function () {
		return (
			<div class="smallForm">
				<div id="logo"><img src="/svg/logo.svg" /></div>
				<form class="signup" method="POST" action="/signup">
					<h3>Create An Account:</h3>
					<input type="text" name="username" placeholder="username" />
					<input type="text" name="email" placeholder="email" />
					<input type="password" name="password" placeholder="password" />
					<button onClick={this.handleSignup}>Signup</button>
				</form>
				<hr />
				<a href="/login"><button>Login</button></a>
			</div>
		);
	}
});

module.exports = Signup;