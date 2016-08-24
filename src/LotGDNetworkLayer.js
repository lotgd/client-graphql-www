import Relay from 'react-relay';

var DefaultNetworkLayer = Relay.DefaultNetworkLayer;

export default class LoGDNetworkLayer extends DefaultNetworkLayer {
    setToken(token) {
        console.log("Set token to ", token);
        this._init.headers = { 
            "token": token
        }
    }
};