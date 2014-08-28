/*
 * Basic Settings Component.
 * Controller-View.
 *
 * @jsx React.DOM
 * 
 */

var form = require('../mixins/form')
	, BasicFormFields = require('./BasicFormFields')
	, UserActions = require('../actions/UserActions')
	, UserStore = require('../stores/UserStore')
	, S3PhotoUploader = require('./S3PhotoUploader');

var Settings = React.createClass({
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
			<div className="settings">
				<nav className="row">
					<button className="span2 offset8" onClick={this.handleLogout}>Logout</button>
				</nav>
				<div className="clear"></div>
				<form onSubmit={this.handleSubmit}>
					<div className="row">
						<h2 className="span2">Settings</h2>
						<hr className="span10" />
					</div>
					<div className="span10">
						<h4>Profile Photo</h4>
						<S3PhotoUploader src={user.profilePhotoUrl} onChange={this.handleProfilePhotoChange} />
					</div>
					<div className="span10">
						{fields}
					</div>
					<div className="span10">
						<button className="span4" onClick={this.handleCancel}>Cancel</button>
						<button className="span4" type="submit">Save</button>
					</div>
					<div className="clear"></div>
				</form>
			</div>
		);
	}
});

module.exports = Settings;