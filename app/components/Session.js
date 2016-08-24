import React from 'react';
import Relay from 'react-relay';

import Configuration from './Configuration';
import Offline from './Offline';
import Online from './Online';

import AuthWithPasswordMutation from '../mutations/AuthWithPasswordMutation';

const Session = React.createClass({
    setApiKeyInRelayHeader(apiKey) {
        window.NetworkLayer.setToken(apiKey);
    },
    
    getInitialState() {
        return {
            session: this.props.session
        };
    },
    
    render() {
        var Session = this.props.session;
        
        if (Session.user === null) {
            return (
                <div>
                    <Offline
                        parent={this}
                        session={Session}
                    />
                </div>
            );
        }
        else {
            return (
                <div>
                    <Online
                        parent={this}
                        session={Session}
                     />
                </div>
            );
        }
    }
});

export default Relay.createContainer(Session, {
    fragments: {            
        session: () => Relay.QL`
            fragment on Session {
                apiKey,
                expiresAt,
                user {
                    id,
                    name
                }
            }
        `
    }
});