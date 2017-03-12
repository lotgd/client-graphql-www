import React, {Component, PropTypes} from 'react';
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
            freshlyAuthenticated: false,
        }
    }

    isUserAuthenticated() {
        // Check if freshly authenticated
        if (this.state.freshlyAuthenticated) {
            return true;
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
        }

        if (this.props.data.session.user !== null) {
            return this.props.data.session.user;
        }

        return null;
    }

    setSession(session) {
        // store token
        localStorage.setItem("token", session["apiKey"]);

        this.setState({
            freshlyAuthenticated: true,
            user: session["user"]
        })
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