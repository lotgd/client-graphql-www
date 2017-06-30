import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'react-apollo';
import update from 'immutability-helper';

import CharacterCreation from './CharacterCreation';
import Message from './parts/Message';

import getCharactersForUser from '../queries/getCharactersForUser.graphql';
import createCharacterMutation from './../mutations/createCharacterMutation.graphql';

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

@graphql(getCharactersForUser, {
    options: (ownProps) => ({
        variables: {
            userId: ownProps.userId
        }
    })
})
@graphql(createCharacterMutation, {
    name: "createCharacterMutation",
    options: {
        updateQueries: {
            getCharactersForUser: (prev, {mutationResult}) => {
                const result = mutationResult.data.createCharacter;
                if (prev.user.id === result.user.id) {
                    return update(prev, {
                        user: {
                            characters: {
                                $push: [result.character]
                            }
                        }
                    })
                }
            }
        }
    }
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
    };

    constructor(props) {
        super(props);

        this.state = {
            creationMessage: null,
            creationError: null,
            creationSuccess: null,
        }
    }

    onActivation(characterId) {
        this.props.characterSelect(characterId);
    }

    onCreate(data) {
        this.setState({
            creationMessage: "Character is being created...",
            creationError: null,
            creationSuccess: null,
        });

        let a = this.props.createCharacterMutation({
            variables: {
                input: {
                    userId: this.props.userId,
                    characterName: data["name"],
                }
            }
        }).then(this.onCreateSuccess.bind(this)).catch(this.onCreateFailure.bind(this));
    }

    onCreateSuccess(data) {
        this.setState({
            creationMessage: "Character has been successfully created.",
            creationSuccess: true,
        });

        this.toggleForm(false);
    }

    onCreateFailure(error) {
        let message = "Character creation was not successful";
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
            message += ": " + error.graphQLErrors[0].message + ".";
        } else {
            message += ".";
        }

        this.setState({
            creationMessage: message,
            creationError: true,
        });
    }

    toggleForm(to = null) {
        if (to) {
            this.setState({toggled: to});
        } else {
            this.setState({toggled: !this.state.toggled});
        }
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

        return <div>
            <div className="d-cardList">
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
                {characters.length === 0 && <Message message="You don't appear to have any characters. Want to create one?" />}
            </div>

            <CharacterCreation
                userId={this.props.userId}
                displayForm={characters.length === 0}
                toggled={this.state.toggled}
                creationMessage={this.state.creationMessage}
                creationError={this.state.creationError}
                onCreate={this.onCreate.bind(this)}
                onToggle={this.toggleForm.bind(this)}
            />
        </div>
    }
}

export default CharacterSelect;
