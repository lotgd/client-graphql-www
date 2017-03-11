import React, {Component, PropTypes} from 'react';
import {graphql} from 'react-apollo';
import RealmQuery from './../queries/RealmQuery.graphql';

import Header from './parts/Header.js';
import Footer from './parts/Footer.js';
import SessionView from './SessionView.js';

@graphql(RealmQuery)
class App extends Component {
    static propTypes = {
        data: PropTypes.shape({
            loading: PropTypes.bool.isRequired,
            realm: PropTypes.object,
        }).isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            userId: null,
            token: null,
        }
    }

    isUserAuthenticated() {
        if (this.state.authenticated) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        if (this.props.data.loading) {
            return <div id="loading"><p className="d-message">Loading...</p></div>
        }

        if (this.props.data.error) {
            console.log(this.props.data.error);
            return <div id="error"><p className="d-message d-message-error">An error occured!</p></div>
        }

        return <div id="app">
            <Header
                title="Daenerys Web Client"
                realm={this.props.data.realm.name}
            />

            <SessionView
                app={this}
            />

            <Footer
                configuration={this.props.data.realm.configuration}
            />
        </div>;
    }
};

export default App;