/** @jsx React.DOM */
/*
 * Basic Navbar Implementation
 */

var Navbar = React.createClass({
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
			navbar = <nav id="navbar" className={className}>
				<div className="container">
					<a id="logo" href="/" className="span2 logo">
						<img src="/svg/logo.svg" />
					</a>
					<div className="menu span8">
						<a href="/">vouchers</a>
						<a href="/clients">clients</a>
						<a href="/settings">settings</a>
					</div>
				</div>
				<div className="clear"></div>
			</nav>
		} else {
			navbar = <div id="navbar" className={className}></div>
		}

		return navbar;
	}
});

module.exports = Navbar;