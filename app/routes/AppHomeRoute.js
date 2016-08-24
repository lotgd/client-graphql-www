import Relay from 'react-relay';

export default class extends Relay.Route {
    static queries = {
        realm: () => Relay.QL`
            query RealmQuery {
                realm
            }
        `
    };
    
    static routeName = 'AppHomeRoute';
};
