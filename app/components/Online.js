import React, {Component, PropTypes} from 'react';

import CharacterSelect from './CharacterSelect';
import Dialog from './parts/Dialog';
import ThreeColumnLayout from './parts/ThreeColumnLayout';
import {ToolBox, Tool} from './parts/ToolBox'

class Online extends Component {
    static PropType = {
        logoutCallback: PropTypes.func.isRequired,
        user: PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string
        }).isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            dialog: null,
            dialogCharacterSelectOpen: false,
            characterId: localStorage.getItem("characterId")
        }
    }

    getCharacterId() {
        return this.state.characterId;
    }

    setCharacterId(id) {
        this.setState({characterId: id, dialog: false});
    }

    openCharacterDialog() {
        if (this.state.dialog === "characters" && this.getCharacterId()) {
            this.setState({dialog: false});
        } else {
            this.setState({dialog: "characters"})
        }
    }

    getCharacterDialog(closable = false) {
        let onClose = null;

        if (closable) {
            onClose = this.openCharacterDialog.bind(this);
        }

        return <Dialog
            title="Character selection"
            displayed={true}
            onClose={onClose}
        >
            <CharacterSelect
                userId={this.props.user.id}
                characterSelect={this.setCharacterId.bind(this)}
                selectedCharacter={this.getCharacterId()}
            />
        </Dialog>
    }

    render() {
        let content = <div>Empty</div>

        if (this.state.dialog) {
            switch (this.state.dialog) {
                case "characters":
                    content = this.getCharacterDialog(true);
                    break;
            }
        } else if (this.getCharacterId()) {
            // character id found
            const middle = <div>Viewpoint</div>;
            const left = <div>Actions</div>;
            const right = <div>CharStats for {this.state.characterId}</div>;

            content = <ThreeColumnLayout
                left={left}
                middle={middle}
                right={right}
            />;
        } else {
            content = this.getCharacterDialog()
        }


        return <div>
            <ToolBox>
                <Tool onClick={this.openCharacterDialog.bind(this)}>Characters</Tool>
                <Tool>Messages</Tool>
                <Tool>Friendlist</Tool>
                <Tool type="right" onClick={this.props.logoutCallback}>Logout</Tool>
            </ToolBox>

            {content}
        </div>
    }
}

export default Online;

/*
import CharacterSelect from './CharacterSelect';
import Viewpoint from './Viewpoint';
import ViewpointRoute from '../routes/ViewpointRoute';

var Online = React.createClass({
    /**
     * Initial state.
     * @returns {CharacterSelectAnonym$3.getInitialState.CharacterSelectAnonym$5}
     * /
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

        if (this.state.dialogDisplayed === false) {
            var viewpointRoute = new ViewpointRoute({characterId: this.state.characterId});
        } else {
            var viewpointRoute = null;
        }

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
                    <Relay.RootContainer
                        Component={Viewpoint}
                        route={viewpointRoute}
                        renderFetched={data =>
                            <Viewpoint
                                {...data}
                                parent={this}
                                characterId={this.state.characterId}
                             />
                        }
                    />
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
});*/