// Libraries
import React from 'react';
import { hashHistory } from 'react-router';

// components
import Header from './Header';

// stores
import ListStore from '../stores/ListStore';

const Account = React.createClass({

    toggleAccount: function(e) {
        hashHistory.push('/lists/');
		e.preventDefault();
	},

	render: function() {
		return (
			<div className="account-view" >
				<Header
					buttonLeft={this.toggleAccount}
					params={this.props.params}
					title="Account"
				/>
				<p>Account Settings</p>
			</div>
		);
	}

});

export default Account;