/** @jsx React.DOM */
/*
 * Basic Login Component.
 *
 */

var Login = React.createClass({displayName: 'Login',
	handleLogin : function () {
		
	},
	render : function () {
		return (
			React.DOM.div( {class:"smallForm"}, 
				React.DOM.div( {id:"logo"}, React.DOM.img( {src:"/svg/logo.svg"} )),
				React.DOM.form( {class:"login", method:"POST", action:"/login"}, 
					React.DOM.h3(null, "Login:"),
					React.DOM.input( {type:"text", name:"username", placeholder:"username"} ),
					React.DOM.input( {type:"password", name:"password", placeholder:"password"} ),
					React.DOM.button( {type:"submit"}, "Login")
				),
				React.DOM.hr(null ),
				React.DOM.a( {href:"/signup"}, React.DOM.button(null, "Signup"))
			)
		);
	}
});

module.exports = Login;