import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloProvider} from 'react-apollo';

import LotgdClient from './../src/LotgdClient'
import App from './components/App';

ReactDOM.render(
    <ApolloProvider  client={LotgdClient}>
        <App />
    </ApolloProvider>,
    document.getElementById("root")
);
/*
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';


import LoGDNetworkLayer from './../src/LotGDNetworkLayer';
import App from './components/App';
import AppHomeRoute from './routes/AppHomeRoute';

var root = document.getElementById('root');

window.NetworkLayer = new LoGDNetworkLayer('http://localhost:8000/');
Relay.injectNetworkLayer(window.NetworkLayer);

/**
 * Render the root elemtent
 *//*
ReactDOM.render(
    <Relay.RootContainer
        Component={App}
        route={new AppHomeRoute()}
    />,
    document.getElementById('root')
);*/