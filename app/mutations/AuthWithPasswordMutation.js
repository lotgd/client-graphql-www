import Relay from 'react-relay';

export default class AuthWithPasswordMutation extends Relay.Mutation {
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
                apiKey,
                expiresAt
            }
        `;
    }
    
    getConfigs() {
        return [{
           type: 'FIELDS_CHANGE',
           fieldIDs: {
               apiKey: this.props.apiKey,
               expiresAt: this.props.expiresAt
           }
        }];
    }
}

