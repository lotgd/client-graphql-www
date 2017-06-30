import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'react-apollo';

import Header from './parts/Header.js';
import Footer from './parts/Footer.js';
import SessionView from './SessionView.js';
import Message from './parts/Message';

import RealmQuery from './../queries/RealmQuery.graphql';

/**
 * Main entry point
 */
@graphql(RealmQuery)
class App extends Component {
    static propTypes = {
        data: PropTypes.shape({
            loading: PropTypes.bool.isRequired,
            realm: PropTypes.object,
            session: PropTypes.object,
        }).isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            freshlyAuthenticated: null,
        }
    }

    isUserAuthenticated() {
        // Check if freshly authenticated
        if (this.state.freshlyAuthenticated) {
            return true;
        } else if (this.state.freshlyAuthenticated === false) {
            return false;
        }

        // If not, check if session was loaded sucessfully
        if (this.props.data.session.user !== null) {
            return true;
        }

        // If not, return false
        return false;
    }

    getUser() {
        if (this.state.freshlyAuthenticated)  {
            return this.state.user;
        } else if (this.state.freshlyAuthenticated === false) {
            return null;
        }

        if (this.props.data.session.user !== null) {
            return this.props.data.session.user;
        }

        return null;
    }

    setSession(session) {
        if (session) {
            // login
            // store token
            localStorage.setItem("token", session["authToken"]);

            this.setState({
                freshlyAuthenticated: true,
                user: session["user"]
            })
        }  else {
            // logout
            localStorage.clear();

            this.setState({
                freshlyAuthenticated: false,
                user: null
            })
        }
    }

    render() {
        if (this.props.data.loading) {
            return <div id="loading"><Message message="Loading..." /></div>;
        }

        if (this.props.data.error) {
            console.log(this.props.data.error);
            return <div id="loading"><Message message="An error occured!" error={true} /></div>;
        }

        return <div id="app">
            <Header
                title="Daenerys Web Client"
                realm={this.props.data.realm.name}
            />

            <SessionView
                app={this}
                setSession={this.setSession.bind(this)}
                user={this.getUser()}
                isAuthenticated={this.isUserAuthenticated()}
            />

            <Footer
                configuration={this.props.data.realm.configuration}
            />
        </div>;
    }
};

export default App;