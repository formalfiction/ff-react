/** @jsx React.DOM */
/*
 * Basic Signup Page
 *
 */

var Signup = React.createClass({displayName: 'Signup',
	handleSignup : function (e) {
		e.preventDefault();
		return false;
	},
	render : function () {
		return (
			React.DOM.div( {class:"smallForm"}, 
				React.DOM.div( {id:"logo"}, React.DOM.img( {src:"/svg/logo.svg"} )),
				React.DOM.form( {class:"signup", method:"POST", action:"/signup"}, 
					React.DOM.h3(null, "Create An Account:"),
					React.DOM.input( {type:"text", name:"username", placeholder:"username"} ),
					React.DOM.input( {type:"text", name:"email", placeholder:"email"} ),
					React.DOM.input( {type:"password", name:"password", placeholder:"password"} ),
					React.DOM.button( {onClick:this.handleSignup}, "Signup")
				),
				React.DOM.hr(null ),
				React.DOM.a( {href:"/login"}, React.DOM.button(null, "Login"))
			)
		);
	}
});

module.exports = Signup;