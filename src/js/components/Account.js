// Libraries
import React from 'react';
import { hashHistory } from 'react-router';

// components
import Header from './Header';

// actions
import AuthActions from '../actions/AuthActions';

// stores
import AuthStore from '../stores/AuthStore';

const Account = React.createClass({

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

    userLogout: function() {
		console.log('User logout');
    	AuthActions.userLogout();
	},

	render: function() {
    	let name = AuthStore.getUser().profile.name;
    	let photo = AuthStore.getUser().profile.photo;
    	let email = AuthStore.getUser().email;
    	let firstInitial = name ? name.substr(0, 1).toUpperCase() : email.substr(0, 1).toUpperCase();

		return (
			<div className="account-view view-transition" >
				<Header
					buttonLeft={this.toggleAccount}
					buttonRight={null}
					buttonBack={true}
					buttonOptions={false}
					params={this.props.params}
					title="Account"
				/>
				<div className="section section--divided section--edit" onClick={this.changePhoto}>
					<label className="form__label">Photo</label>
					{photo ?
						<div className="user-avatar"></div>
						:
						<p className="p--standard">{firstInitial}</p>
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
					<div className="button button--warning" onClick={this.userLogout}>Log Out</div>
				</div>
			</div>
		);
	}

});

export default Account;