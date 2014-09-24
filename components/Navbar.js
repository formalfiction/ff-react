/** @jsx React.DOM */
/*
 * Basic Navbar Implementation
 */

var Navbar = React.createClass({displayName: 'Navbar',
	getInitialState : function () {
		return {
			hidden : false
		}
	},
	hide : function () {
		this.setState({ hidden : true });
	},
	show : function () {
		this.setState({ hidden : false });
	},
	toggleHidden : function () {
		this.setState({ hidden : !this.state.hidden });
	},
	render : function () {
		var hidden = this.state.hidden
			, className = this.state.hidden ? "navbar hidden" : "navbar"
			, navbar;

		if (!hidden) {
			navbar = React.DOM.nav( {id:"navbar", className:className}, 
				React.DOM.div( {className:"container"}, 
					React.DOM.a( {id:"logo", href:"/", className:"span2 logo"}, 
						React.DOM.img( {src:"/svg/logo.svg"} )
					),
					React.DOM.div( {className:"menu span8"}, 
						React.DOM.a( {href:"/"}, "vouchers"),
						React.DOM.a( {href:"/clients"}, "clients"),
						React.DOM.a( {href:"/settings"}, "settings")
					)
				),
				React.DOM.div( {className:"clear"})
			)
		} else {
			navbar = React.DOM.div( {id:"navbar", className:className})
		}

		return navbar;
	}
});

module.exports = Navbar;