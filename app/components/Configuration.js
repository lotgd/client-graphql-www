import React from 'react';
import Relay from 'react-relay';

class Configuration extends React.Component {
    render() {
        var lib = this.props.Lib;
        var type = this.props.type;
        
        if (type === "core") {
            return (
                <div>Core: Using {lib.library} in version {lib.version}</div>
            );
        } else if (type === "crate") {
            return (
                <div>Crate: Using {lib.library} in version {lib.version}</div>
            );
        } else {
             return (
                <div>Library: Using {lib.library} in version {lib.version}</div>
            );
        }
    }
}

export default Relay.createContainer(Configuration, {
    fragments: {
        Lib: () => Relay.QL`
            fragment on Library {
                library
                version
            }
        `,
    },
});