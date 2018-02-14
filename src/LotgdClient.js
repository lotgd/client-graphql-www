/*import {ApolloClient, createNetworkInterface} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {ApolloLink} from

class LotGDLink extends HttpLink {
    setUri(uri) {
        this._uri = uri
    }
}

const link = new LotGDLink({
    uri: "http://localhost:8000",
});

link.use([{
    applyMiddleware(req, next) {
        if (!req.options.headers) {
            req.options.headers = {};
        }

        // Get auth token from local storage
        const token = localStorage.getItem('token');

        // Set header if token exists
        if (token) {
            console.log("Token found! It's " + token);
            req.options.headers.x_lotgd_auth_token = token;
        }

        // continue with middleware
        next();
    }
}]);

 const LotgdClient = new ApolloClient({
 networkInterface: networkInterface,
 dataIdFromObject: o => o.id
 });

 console.log(LotgdClient.networkInterface)

*/

import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, concat } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = new HttpLink();

const authMiddleware = new ApolloLink((operation, forward) => {
    // Get auth token from local storage
    const token = localStorage.getItem('token');

    // add the authorization to the headers
    if (token) {
        console.log("Token found! It's " + token);
        operation.setContext({
            headers: {
                x_lotgd_auth_token: token
            }
        });
    }

    if (window.location.protocol == "file:") {
        operation.setContext({
            uri: "http://localhost:8000/graphql/"
        });
    } else {
        operation.setContext({
            uri: "graphql/"
        });
    }

    return forward(operation);
})

const LotgdClient = new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache()
});

export default LotgdClient;