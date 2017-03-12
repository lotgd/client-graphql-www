import React, {Component, PropTypes} from 'react';
import {graphql} from 'react-apollo';

import Message from './parts/Message';

import CharacterQuery from './../queries/CharacterQuery.graphql';

class CharacterEntry extends Component {
    static PropType = {
        character: PropTypes.object.isRequired,
        onActivation: PropTypes.func.isRequired,
        selected: PropTypes.bool.isRequired
    };

    render() {
        let classes = "d-cardItem";
        if (this.props.selected) {
            classes += " d-selected";
        }

        return <div className={classes}>
            <img src="" onClick={this.props.onActivation} />
            <h3>{this.props.character.displayName}</h3>
        </div>
    }
}

@graphql(CharacterQuery, {
    options: (ownProps) => ({
        variables: {
            userId: ownProps.userId
        }
    })
})
class CharacterSelect extends Component {
    static PropType = {
        userId: PropTypes.string.isRequired,
        data: PropTypes.shape({
            loading: PropTypes.bool,
            error: PropTypes.object,
            user: PropTypes.object
        }).isRequired,
        characterSelect: PropTypes.func.isRequired,
        selectedCharacter: PropTypes.string
    };

    static defaultProps = {
    }

    onActivation(characterId) {
        this.props.characterSelect(characterId);
    }

    render() {
        if (this.props.data.loading) {
            return <Message message="Loading list of characters" />
        }

        if (this.props.data.error) {
            console.log(this.props.data.error);
            return <Message message="An error occured during character loading" error={true} />
        }

        const characters = this.props.data.user.characters;

        return <div className="d-cardList">
            {characters.length > 0 && characters.map((character) => {
                let selected = false;

                if (this.props.selectedCharacter === character.id) {
                    selected = true;
                }

                return <CharacterEntry
                    key={character.id}
                    character={character}
                    onActivation={this.onActivation.bind(this, character.id)}
                    selected={selected}
                />;
            })}
        </div>
    }
}

export default CharacterSelect;

/*import React from 'react';
import Relay from 'react-relay';

import CreateCharacterMutation from '../mutations/CreateCharacterMutation';

/**
 * The button to display or hide the character creation form.
 * @param {type} props
 * @returns {Function|String}
 * /
function CreationButton(props) {
    const content = props.toggle ? "^" : "+";

    return (
        <div className="daenerys-add" onClick={() => {props.onClick();}}>{content}</div>
    );
}

/**
 * A single character entry in the list of characters.
 * @param {type} props
 * @returns {Function|String}
 * /
function CharacterEntry(props) {
    return (
        <div className="daenerys-list-item-widget">
            <img src="" onClick={() => {props.onClick(props.id);}} />
            <h3>{props.displayName}</h3>
        </div>
    );
}

var CreationForm = React.createClass({
    /**
     * Returns the initial state of this react container.
     * @returns {CharacterSelectAnonym$1.getInitialState.CharacterSelectAnonym$2}
     * /
    getInitialState: function() {
        return {
            characterName: '',
        };
    },

    /**
     * Handles the change of a form field and stores it in the state of this object.
     * @param {string} field
     * @param {event} e
     * @returns {undefined}
     * /
    handleChange: function(field, e) {
        var nextState = {};
        nextState[field] = e.target.value;

        this.setState(nextState);
    },

    onFormSubmission: function() {
        this.props.onSubmission(this, this.state["characterName"]);
    },

    /**
     * Rendering function for the character creation form.
     *  @returns {String}
     * /
    render: function() {
        return (
            <div className="w3-container">
                <label>Name of the character </label>
                <input
                    className="w3-input"
                    type="text"
                    name="characterName"
                    value={this.state.characterName}
                    onChange={this.handleChange.bind(this, 'characterName')}
                />

                <button className="w3-button" onClick={this.onFormSubmission}>Create</button>
            </div>
        );
    }
});

var CharacterSelect = React.createClass({
    /**
     * @ToDo: Set the current character globally.
     * @param {type} characterId
     * @returns {undefined}
     * /
    activateCharacter: function(characterId) {
        console.log("Activating character with id " + characterId);
        this.props.parent.setActiveCharacter(characterId);
    },

    /**
     * Toggles the creation form button.
     * @returns {undefined}
     * /
    showCreationForm: function() {
        this.setState({showCreationForm: !this.state.showCreationForm});
    },

    /**
     * Initial state.
     * @returns {CharacterSelectAnonym$3.getInitialState.CharacterSelectAnonym$5}
     * /
    getInitialState: function() {
        return {
            showCreationForm: false,
            creationSubmitted: false,
        };
    },

    /**
     * Event upon pressind the character creation button.
     * @param {type} creationForm
     * @param {type} characterName
     * @returns {undefined}
     * /
    onCharacterCreation: function(creationForm, characterName) {
        this.props.relay.commitUpdate(
            new CreateCharacterMutation({
                characterName: characterName,
                user: this.props.user
            }), {
                onFailure: (response) => {this.onCharacterCreationError(creationForm, characterName)},
                onSuccess: (response) => {this.onCharacterCreationSuccess(creationForm, characterName)}
            }
        );

        this.setState({submitted: true});
    },

    /**
     * Event upon the character creation fails.
     * @param {type} creationForm
     * @param {type} characterName
     * @returns {undefined}
     * /
    onCharacterCreationError: function(creationForm, characterName) {
        this.setState({
            errormessage: "The character with the name " + characterName + " already exists",
            submitted: false
        });

        console.log("Character with the name " + characterName + " was NOT created. Error.");
    },

    /**
     * Event upon the character creation succeeds.
     * @param {type} creationForm
     * @param {type} characterName
     * @returns {undefined}
     * /
    onCharacterCreationSuccess: function(creationForm, characterName) {
        creationForm.setState(creationForm.getInitialState());
        this.setState({
            submitted: false,
            showCreationForm: false,
        });

        console.log("Character with the name " + characterName + " was created.");
    },

    /**
     * Render information.
     * @returns {String|Boolean}
     * /
    render: function() {
        var showCreationForm = false;
        var characterList = "";
        var noCharacterMessage = "";

        if (this.props.user.characters.edges.length === 0) {
            showCreationForm = true;
            noCharacterMessage = "You seem to not have any characters yet. Click \n\
                on the button to create one.";
        }

        if (this.state.showCreationForm === true) {
            showCreationForm = true;
        }

        return (
            <div className="w3-row">
                <div className="daenerys-dialog-space w3-col l3 m2">&nbsp;</div>
                <div className="daenerys-dialog-container w3-col l6 m8">
                    <div id="daenerys-character-select" className="daenerys-dialog">
                        <h2>Character selection</h2>


                        {this.props.user.characters.edges.length > 0 &&
                            <div className="daenerys-list-widget">
                                {this.props.user.characters.edges.map((entry) => {
                                    return <CharacterEntry
                                        key={entry.node.id}
                                        id={entry.node.id}
                                        displayName={entry.node.displayName}
                                        onClick={this.activateCharacter}
                                    />;
                                })}
                            </div>
                        }

                        {this.props.user.characters.edges.length > 0 && <CreationButton onClick={this.showCreationForm} toggle={this.state.showCreationForm} />}

                        {showCreationForm === true && <CreationForm onSubmission={this.onCharacterCreation} />}
                    </div>
                </div>
                <div className="daenerys-dialog-space w3-col l3 m2 s10">&nbsp;</div>
            </div>
        );
    }
});

export default Relay.createContainer(CharacterSelect, {
    fragments: {
    },
    shouldComponentUpdate: () => true,
});*/