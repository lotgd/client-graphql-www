import React from 'react';
import Relay from 'react-relay';

import CharacterSelect from './CharacterSelect';

var Online = React.createClass({
    /**
     * Initial state.
     * @returns {CharacterSelectAnonym$3.getInitialState.CharacterSelectAnonym$5}
     */
    getInitialState: function() {
        return {
            characterId: null,
            dialogDisplayed: true,
            dialogOpened: "characterSelect",
        };
    },

    hideDialog: function(dialogId) {
        this.setState({
            dialogDisplayed: false,
            dialogOpened: false
        });
    },

    showDialog: function(dialogId) {
        this.setState({
            dialogDisplayed: true,
            dialogOpened: dialogId
        });
    },

    setActiveCharacter: function(characterId) {
        this.props.parent.setState({characterId: characterId});
        this.setState({characterId: characterId});
        this.hideDialog("characterSelect");
    },

    handleLogout: function() {
        console.log("Logout process.");

        this.props.parent.setApiKeyInRelayHeader(false);
        this.props.parent.setState({
            session: {
                apiKey: null,
                expiresAt: null,
                user: null
            },
            characterId: null
        });
    },

    render: function() {
        var Session = this.props.session;
        var User = this.props.user;

        return (
            <div className="scene">
                <menu className="w3-navbar w3-dark-grey">
                    <li><a>Messages</a></li>
                    <li><a>Friendlist</a></li>
                    <li className="w3-right"><a onClick={this.handleLogout}>Logout?</a></li>
                </menu>

                {this.state.dialogDisplayed === true && this.state.dialogOpened === "characterSelect" &&
                    <CharacterSelect
                        user={User}
                        parent={this}
                    />
                }

                {this.state.dialogDisplayed === false &&
                    <div className="w3-row">
                        <div className="characterActions w3-col l3 m2">
                            Actions
                        </div>
                        <div className="characterScene w3-col l6 m8">
                            CharacterScene
                        </div>
                        <div className="characterStats w3-col l3 m2">
                            CharacterStats
                        </div>
                    </div>
                }
            </div>
        );
   }

});

export default Relay.createContainer(Online, {
    fragments: {
        user: () => Relay.QL`
            fragment on User {
                id
                name
                characters(first: 20) {
                    pageInfo {
                        hasNextPage,
                        hasPreviousPage,
                        startCursor,
                        endCursor,
                    },
                    edges {
                        cursor
                        node {
                            id
                            name
                            displayName
                        }
                    }
                }
            }
        `
    },
    shouldComponentUpdate: () => true,
});