import Relay from 'react-relay';

var DefaultNetworkLayer = Relay.DefaultNetworkLayer;

export default class LoGDNetworkLayer extends DefaultNetworkLayer {
    setToken(token) {
        console.log("Set token to ", token);

        if (token !== false) {
            this._init.headers = {
                "X-LotGD-Auth-Token": token
            };
        } else {
            this._init.headers = {};
        }
    }
};