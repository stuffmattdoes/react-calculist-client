// Libraries
import React, { Component } from 'react';
import { browserHistory } from 'react-router';

// Stores
import AuthStore from '../stores/AuthStore';

export default (ComposedComponent) => {
    return class AuthComponent extends Component {

        constructor(props) {
            super(props);
            this.state = {
                authorized: AuthStore.isUserAuth(),
                jwt: AuthStore.getToken(),
                user: AuthStore.getUser()
            }
        }

        // static contextTypes = {
        //     router: React.PropTypes.object
        // }

        componentWillMount() {
            console.log(this.state.authorized);

            if (!!this.state.authorized) {
                browserHistory.push('/login');
                console.log('Not authorized');
            }
        }

        componentWillUpdate() {
            if (!!this.state.authorized) {
                browserHistory.push('/login');
                console.log('Not authorized');
            }
        }

        render() {
            return (
              <ComposedComponent
                  {...this.props}
              />
            );
        }
    }
}
