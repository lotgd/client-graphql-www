import React, {Component, PropTypes} from 'react';
import {graphql} from 'react-apollo';

import Offline from './Offline';

import AuthWithPasswordMutation from './../mutations/AuthWithPasswordMutation.graphql';

@graphql(AuthWithPasswordMutation, {name: "authWithPassword"})
class SessionView extends Component {
    static propTypes = {
        app: PropTypes.object.isRequired,
        authWithPassword: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            message: null
        };
    }

    loginCallback(data) {
        this.setState({"message": "Login in process...", error: false})

        if (data["type"] === "classic") {
            this.props.authWithPassword({
                variables: {
                    input: {
                        email: data["email"],
                        password: data["password"],
                    }
                }
            }).then((data) => {
                this.setState({message: "Login successful", error: false})
            }).catch((error) => {
                this.setState({message: "Login failed", error: true})
            });
        } else {
            console.log("Attempt social login");
        }
    }

    render() {
        if (this.props.app.isUserAuthenticated()) {
            return <div className="app-sessionView w3-container">
                SessionView
            </div>

        } else {
            return <div className="app-sessionView w3-container">
                <Offline
                    message={this.state.message}
                    error={this.state.error}
                    loginCallback={this.loginCallback.bind(this)}
                />
            </div>
        }
    }
}

export default SessionView;