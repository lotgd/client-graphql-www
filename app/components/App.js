import React from 'react';
import Relay from 'react-relay';

import Configuration from './Configuration';

var Title = React.createClass({
    render() {
        return (
            <h1>{this.props.val}</h1>
        );
    }
});

var Connection = React.createClass({
   render() {
        return (
            <div>
                Connected to {this.props.name}.
            </div>
        );
   } 
});

class App extends React.Component {
    render() {
        var Realm = this.props.viewer;
        
        return (
            <div>
                <Title val="Daenerys Web client" />
                <Connection name={Realm.name} />
                
                
                <Configuration
                    type="core"
                    Lib={Realm.configuration.core}
                />
                <Configuration
                    type="crate"
                    Lib={Realm.configuration.crate}
                />
            </div>
        );
    }
}

export default Relay.createContainer(App, {
    fragments: {
        viewer: () => Relay.QL`
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