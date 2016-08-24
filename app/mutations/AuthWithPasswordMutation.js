import Relay from 'react-relay';

export default class AuthWithPasswordMutation extends Relay.Mutation {
    static fragments = {
        session: () => Relay.QL`
            fragment on Session {
                apiKey,
                expiresAt,
                user {
                    id,
                    name
                }
            }
        `,
    };
    
    getMutation() {
        return Relay.QL`mutation {authWithPassword}`;
    }
    
    getVariables() {
        return {
            email: this.props.email,
            password: this.props.password
        };
    }
    
    getFatQuery() {
        return Relay.QL`
            fragment on AuthWithPasswordPayload {
                session
            }
        `;
    }
    
    getConfigs() {
        /*return [{
           type: 'FIELDS_CHANGE',
           fieldIDs: {
               session: this.props.session,
           }
        }];*/
        return [{
           type: 'REQUIRED_CHILDREN',
           children: [Relay.QL`
                fragment on AuthWithPasswordPayload {
                    session {
                        apiKey,
                        expiresAt,
                        user { 
                            id,
                            name
                        }
                    }
                }
            `]
        }];
    }
}

