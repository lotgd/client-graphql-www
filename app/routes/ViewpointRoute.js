import Relay from 'react-relay';

export default class extends Relay.Route {
    static queries = {
        viewpoint: () => Relay.QL`
            query  {
                viewpoint(characterId: $characterId)
            }
        `
    };
    static paramDefinitions = {
        characterId: {required: true},
    };
    static routeName = 'ViewpointRoute';
};

