// Libraries
import React from 'react';
import { hashHistory } from 'react-router';

// components
import Header from './Header';
import Modal from './Modal';

// actions
import AuthActions from '../actions/AuthActions';

// stores
import AuthStore from '../stores/AuthStore';

const Account = React.createClass({

	getInitialState: function() {
		return {
			showModal: false
		}
	},

    toggleAccount: function(e) {
        hashHistory.push('/lists/');
		e.preventDefault();
	},

    changePhoto: function(e) {
    	console.log('Change photo');
	},

	changeName: function(e) {
    	console.log('Change name');
	},

	changePassword: function(e) {
    	console.log('Change password');
	},

	toggleModal: function() {
    	this.setState({showModal: true});
	},

	cancelLogout: function() {
    	this.setState({showModal: false});
	},

    confirmLogout: function() {
        this.setState({showModal: false});
    	AuthActions.userLogout();
	},

	render: function() {
    	let name = AuthStore.getUser().profile.name;
    	let photo = AuthStore.getUser().profile.photo;
    	let email = AuthStore.getUser().email;
    	let firstInitial = name ? name.substr(0, 1).toUpperCase() : email.substr(0, 1).toUpperCase();

		return (
			<div className="account-view view-transition" >
				<Modal
					showModal={this.state.showModal}
					headlineText="Log Out"
					bodyText="Are you sure you want to log out?"
					cancelText="Cancel"
					confirmText="Log Out"
					cancelClick={this.cancelLogout}
					confirmClick={this.confirmLogout}
				/>
				<Header
					buttonLeft={this.toggleAccount}
					buttonRight={null}
					buttonBack={true}
					buttonOptions={false}
					params={this.props.params}
					title="Account"
				/>
				<div className="container--scroll container--full">
					<div className="section section--divided section--edit" onClick={this.changePhoto}>
						<label className="form__label">Photo</label>
						{photo ?
							<div className="user-avatar user-avatar--standard"><img src="http://placehold.it/48x48" /></div>
							:
							<div className="user-avatar user-avatar--placeholder">{firstInitial}</div>
						}
					</div>
					<div className="section section--divided section--edit" onClick={this.changePhoto}>
						<label className="form__label">Name</label>
						{name ?
							<p className="p--standard">{name}</p>
							:
							<p className="text--placeholder">Your name here</p>
						}
					</div>
					<div className="section section--divided section--edit" onClick={this.changePhoto}>
						<label className="form__label">Email</label>
						<p className="p--standard">{email}</p>
					</div>
					<div className="section section--divided section--edit" onClick={this.changePhoto}>
						<label className="form__label">Password</label>
						<p className="p--standard">•••••••</p>
					</div>
					<div className="section align--right">
						<div className="button button--warning" onClick={this.toggleModal}>Log Out</div>
					</div>
				</div>
			</div>
		);
	}

});

export default Account;