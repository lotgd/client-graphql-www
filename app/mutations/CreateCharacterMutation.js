import Relay from 'react-relay';

export default class CreateCharacterMutation extends Relay.Mutation {
    /**
     * The create character mutation has a hard dependence on the user-id. Without it,
     * we cannot add a new character to an existing user.
     */
    static fragments = {
        user: () => Relay.QL`
            fragment on User {
                id
            }
        `,
    };

    /**
     * Simply the mutation field used for this mutation.
     */
    getMutation() {
        return Relay.QL`mutation {createCharacter}`;
    }

    /**
     * Returns the parameters required for the mutation.
     */
    getVariables() {
        return {
            userId: this.props.user.id,
            characterName: this.props.characterName
        };
    }

    /**
     * Specify what we would like to have back from the payload.
     */
    getFatQuery() {
        return Relay.QL`
            fragment on CreateCharacterPayload {
                user,
                characterEdge
            }
        `;
    }

    /**
     * The mutation acts on extending a connection (a list of elements). Thus, we
     * need to use RANGE_ADD. The mutation configuration parameters are:
     *  type:               RANGE_ADD
     *  parentName:         The field name of the object that the connection field belongs to
     *  parentID:           The ID for the parent
     *  connectionName:     The field name of the connection itself.
     *  edgeName:           The field name in the mutation that returns the (new) edge.
     *  rangeBehaviors:     How relay should behave depending on what the mutation does. Here, simply append.
     */
    getConfigs() {
        return [{
            type: 'RANGE_ADD',
            parentName: 'user',
            parentID: this.props.user.id,
            connectionName: 'character',
            edgeName: 'characterEdge',
            rangeBehaviors: {
                '': 'append',
            },
        }];
    }
}

