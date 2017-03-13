import React, {Component, PropTypes} from 'react';

import CharacterSelect from './CharacterSelect';
import Viewpoint from './Viewpoint';
import Dialog from './parts/Dialog';
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
        localStorage.setItem("characterId", id);
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
            content = <Viewpoint
                characterId={this.getCharacterId()}
                />;
        } else {
            content = this.getCharacterDialog();
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