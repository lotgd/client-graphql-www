import Relay from 'react-relay';

export default class CreateCharacterMutation extends Relay.Mutation {
    static fragments = {
        user: () => Relay.QL`
            fragment on User {
                id,
                characters,
            }
        `,
    };

    getMutation() {
        return Relay.QL`mutation {createCharacter}`;
    }

    getVariables() {
        return {
            userId: this.props.user.id,
            characterName: this.props.characterName
        };
    }

    getFatQuery() {
        return Relay.QL`
            fragment on CreateCharacterPayload {
                character,
                user
            }
        `;
    }

    getConfigs() {
        return [{
           type: 'FIELDS_CHANGE',
           fieldIDs: {
               user: this.props.user,
           }
        }];
        /*return [{
           type: 'REQUIRED_CHILDREN',
           children: [Relay.QL`
                fragment on CreateCharacterPayload {
                    character {
                        id
                        name
                        displayName
                    }
                }
            `]
        }];*/
    }
}

