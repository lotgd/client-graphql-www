import Relay from 'react-relay';

export default class extends Relay.Route {
    static queries = {
        session: () => Relay.QL`
            query SessionQuery {
                session
            }
        `
    };
    
    static routeName = 'SessionRoute';
};

