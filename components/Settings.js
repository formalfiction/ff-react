/** @jsx React.DOM */
/*
 * Basic Settings Component.
 * Controller-View.
 *
 * 
 */

var form = require('../mixins/form')
	, BasicFormFields = require('./BasicFormFields')
	, UserActions = require('../actions/UserActions')
	, UserStore = require('../stores/UserStore')
	, S3PhotoUploader = require('./S3PhotoUploader');

var Settings = React.createClass({displayName: 'Settings',
	mixins : [form],
	modelName : 'user',
	componentWillMount : function () {
		UserStore.onChange(this.handleStoreChange);
	},
	componentWillUnmount : function () {
		UserStore.offChange(this.handleStoreChange);
	},
	getInitialState : function () {
		return { user : UserStore.current() }
	},
	onChange : function (user) {
		UserActions.localUpdateCurrent(user);
	},
	handleProfilePhotoChange : function (url) {
		console.log(url);
		UserActions.updateCurrent({
			id : this.state.user.id,
			profilePhotoUrl : url
		});
	},
	handleStoreChange : function () {
		this.setState({
			user : UserStore.current()
		});
	},
	fields : [
		{
			name : "firstName",
			type : "text",
			label : "First Name"
		},
		{
			name : "lastName",
			type : "text",
			label : "Last Name"
		},
		{
			name : "email",
			type : "text",
			label : "Email"
		},
		{
			name : "agencyName",
			label : "Agency",
			type : "text"
		},
		// Agency Contact Section
		{
			name : "Agency Contact",
			type : "fieldSet",
			fields : [
				{
					name : "agencyContactName",
					label : "Agency Contact's Name",
					type : "text"
				},
				{
					name : "agencyPhone",
					label : "Agency Contact's Phone",
					type : "text"
				},
				{
					name : "agencyEmail",
					label : "Agency Contact's Email",
					type : "text"
				},
			]
		},
		// Accounting Section
		{
			name : "Accounting Contact",
			type : "fieldSet",
			fields : [
				{
					name : "accountingName",
					label : "Accounting Contact's Name",
					type : "text"
				},
				{
					name : "accountingPhone",
					label : "Accounting Contact's Phone",
					type : "text"
				},
				{
					name : "accountingEmail",
					label : "Accounting Contact's Email",
					type : "text"
				},
			],
		}
	],
	onSubmit : function (data) {
		UserActions.updateCurrent(data);
	},
	onCancel : function () {
		UserActions.cancelUpdate();
	},
	handleLogout : function (e) {
		e.preventDefault();
		// UserActions.logout();
		window.location.href = "/logout";
		return false;
	},
	render : function () {
		var fields = BasicFormFields.call(this, this.fields)
			, user = this.state.user;

		return (
			React.DOM.div( {className:"settings"}, 
				React.DOM.nav( {className:"row"}, 
					React.DOM.button( {className:"span2 offset8", onClick:this.handleLogout}, "Logout")
				),
				React.DOM.div( {className:"clear"}),
				React.DOM.form( {onSubmit:this.handleSubmit}, 
					React.DOM.div( {className:"row"}, 
						React.DOM.h2( {className:"span2"}, "Settings"),
						React.DOM.hr( {className:"span10"} )
					),
					React.DOM.div( {className:"span10"}, 
						React.DOM.h4(null, "Profile Photo"),
						S3PhotoUploader( {src:user.profilePhotoUrl, onChange:this.handleProfilePhotoChange} )
					),
					React.DOM.div( {className:"span10"}, 
						fields
					),
					React.DOM.div( {className:"span10"}, 
						React.DOM.button( {className:"span4", onClick:this.handleCancel}, "Cancel"),
						React.DOM.button( {className:"span4", type:"submit"}, "Save")
					),
					React.DOM.div( {className:"clear"})
				)
			)
		);
	}
});

module.exports = Settings;