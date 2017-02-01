import React from 'react';
import Relay from 'react-relay';

import Configuration from './Configuration';
import Offline from './Offline';
import Online from './Online';
import UserRoute from '../routes/UserRoute';

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
        var Session = this.state.session;

        if (Session.user === null) {
            return (
                <Offline
                    parent={this}
                    session={Session}
                />
            );
        }
        else {
            var userRoute = new UserRoute({userID: this.state.session.user.id});

            return (
                <Relay.RootContainer
                    Component={Online}
                    route={userRoute}
                    renderFetched={data =>
                        <Online
                            {...data}
                            parent={this}
                            session={Session}
                            userid={Session.user.id}
                         />
                    }
                />
            );
        }
    },
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