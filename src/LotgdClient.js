import {ApolloClient, createNetworkInterface} from 'react-apollo';

const networkInterface = createNetworkInterface({
    uri: "http://localhost:8000",
});

networkInterface.use([{
    applyMiddleware(req, next) {
        if (!req.options.headers) {
            req.options.headers = {};
        }

        // Get auth token from local storage
        const token = localStorage.getItem('token');

        // Set header if token exists
        if (token) {
            req.options.headers.token = token;
        }

        // continue with middleware
        next();
    }
}]);

const LotgdClient = new ApolloClient({
    networkInterface: networkInterface,
    dataIdFromObject: o => o.id
});

export default LotgdClient;