import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'react-apollo';

import Offline from './Offline';
import Online from './Online';

import AuthWithPasswordMutation from './../mutations/AuthWithPasswordMutation.graphql';

@graphql(AuthWithPasswordMutation, {name: "authWithPassword"})
class SessionView extends Component {
    static propTypes = {
        app: PropTypes.object.isRequired,
        authWithPassword: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool.isRequired,
        setSession: PropTypes.func.isRequired,
        user: PropTypes.object,
    };

    constructor(props) {
        super(props);

        this.state = {
            message: null,
            error: false,
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
            }).then(
                this.onLoginSuccess.bind(this)
            ).catch(
                this.onLoginFailure.bind(this)
            );
        } else {
            // @ToDo: implement later the social login
            console.log("Attempt social login - not implemented yet.");
        }
    }

    onLoginSuccess(data) {
        this.setState({message: "Login was successful", error: false})
        this.props.setSession(data["data"]["authWithPassword"]["session"]);
    }

    onLoginFailure(error) {
        if (error.graphQlErrors) {
            const errMessage = error.graphQLErrors[0].message;
            this.setState({message: "Login has failed: " + errMessage, error: true});
        } else {
            this.setState({message: "Unknown error" + error.message, error: true});
        }
    }

    logoutCallback() {
        this.props.setSession(null);
    }

    render() {
        if (this.props.isAuthenticated) {
            return <div className="app-sessionView w3-container w3-padding-0">
                <Online
                    user={this.props.user}
                    logoutCallback={this.logoutCallback.bind(this)}
                />
            </div>

        } else {
            return <div className="app-sessionView w3-container w3-padding-0">
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