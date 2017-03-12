// Libraries
import React from 'react';
import { hashHistory } from 'react-router';

// components
import Header from './Header';

// actions
import AuthActions from '../actions/AuthActions';

// stores
// import ListStore from '../stores/ListStore';

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
				<div className="section section--divided" onClick={this.changePhoto}>
					<label className="form__label">Photo</label>
					<div className="user-avatar"></div>
				</div>
				<div className="section section--divided" onClick={this.changePhoto}>
					<label className="form__label">Name</label>
					<p>Matthew Morrison</p>
				</div>
				<div className="section section--divided" onClick={this.changePhoto}>
					<label className="form__label">Email</label>
					<p>m.james.morrison00@gmail.com</p>
				</div>
				<div className="section section--divided" onClick={this.changePhoto}>
					<label className="form__label">Password</label>
					<p>•••••••</p>
				</div>
				<div className="section align--right">
					<div className="button button--warning" onClick={this.userLogout}>Log Out</div>
				</div>
			</div>
		);
	}

});

export default Account;