import React from 'react';
import Relay from 'react-relay';

var Online = React.createClass({
    handleLogout: function() {
        console.log("Logout process.");

        this.props.parent.setApiKeyInRelayHeader(false);
        this.props.parent.setState({
            session: {
                apiKey: null,
                expiresAt: null,
                user: null
            }
        });
    },

    render: function() {
        var Session = this.props.session;

        return (
            <div className="scene">
                <menu className="w3-navbar w3-dark-grey">
                    <li><a>Messages</a></li>
                    <li><a>Friendlist</a></li>
                    <li className="w3-right"><a onClick={this.handleLogout}>Logout?</a></li>
                </menu>

                <div className="w3-row">
                    <div className="characterActions w3-col l3 m2 s1">
                        Actions
                    </div>
                    <div className="characterScene w3-col l6 m8 s10">
                        CharacterScene
                    </div>
                    <div className="characterStats w3-col l3 m2 s1">
                        CharacterStats
                    </div>
                </div>
            </div>
        );
   }

});

export default Relay.createContainer(Online, {
    fragments: {
    }
});