import Relay from 'react-relay';

export default class TakeActionMutation extends Relay.Mutation {
    static fragments = {
        viewpoint: () => Relay.QL`
            fragment on Viewpoint {
                title,
                description,
                actionGroups {
                    id,
                    title,
                    sortKey,
                    actions {
                        id,
                        title,
                    }
                }
            }
        `,
    };

    getMutation() {
        return Relay.QL`mutation {takeAction}`;
    }

    getVariables() {
        return {
            characterId: this.props.characterId,
            actionId:  this.props.actionId,
        };
    }

    getFatQuery() {
        return Relay.QL`
            fragment on TakeActionPayload {
                viewpoint
            }
        `;
    }

    getConfigs() {
        return [{
           type: 'REQUIRED_CHILDREN',
           children: [Relay.QL`
                fragment on TakeActionPayload {
                    viewpoint {
                        title,
                        description,
                        actionGroups {
                            id,
                            title,
                            sortKey,
                            actions {
                                id,
                                title,
                            }
                        }
                    }
                }
            `]
        }];
    }
}

