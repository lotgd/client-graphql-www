import Relay from 'react-relay';

export default class extends Relay.Route {
    static queries = {
        user: () => Relay.QL`
            query  {
                user(id: $userID)
            }
        `
    };
    static paramDefinitions = {
        userID: {required: true},
    };
    static routeName = 'UserRoute';
};

