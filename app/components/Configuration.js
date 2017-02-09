import React from 'react';
import Relay from 'react-relay';

class Configuration extends React.Component {
    render() {
        var lib = this.props.Lib;
        var type = this.props.type;
        const type_string = (type === "core" ? "Core" : (type === "crate" ? "Crate" : "Library"));

        return (
            <div>{type_string}: Using {lib.library} in version {lib.version}</div>
        );
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