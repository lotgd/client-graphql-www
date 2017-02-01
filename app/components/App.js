import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

import Configuration from './Configuration';

import Session from './Session';
import SessionRoute from './../routes/SessionRoute';

import AuthWithPasswordMutation from '../mutations/AuthWithPasswordMutation';

function Title(props) {
    return <h1>{props.val}</h1>;
}

function Connection(props) {
    return <div>Connected to {props.name}</div>
}

/*var Title = React.createClass({
    render() { return (<h1>{this.props.val}</h1>); }
});

var Connection = React.createClass({
    render() { return (<div>Connected to {this.props.name}.</div>); }
});*/

const App = React.createClass({
    render() {
        var Realm = this.props.realm;

        return (
            <div id="app">
                <header className="w3-container">
                    <Title val="Daenerys Web client" />
                    <Connection name={Realm.name} />
                </header>

                <div id="sessionView" className="w3-container">
                    <Relay.RootContainer
                        Component={Session}
                        route={new SessionRoute()}
                    />
                </div>

                <footer className="wrapper-bottom">
                    <Configuration
                        type="core"
                        Lib={Realm.configuration.core}
                    />
                    <Configuration
                        type="crate"
                        Lib={Realm.configuration.crate}
                    />
                </footer>
            </div>
        );
    },
});

export default Relay.createContainer(App, {
    fragments: {
        realm: () => Relay.QL`
            fragment on Realm {
                name
                url
                configuration {
                    core {${Configuration.getFragment('Lib')}}
                    crate {${Configuration.getFragment('Lib')}}
                }
            }
        `,
    },
});