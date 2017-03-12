import React from 'react';

import Offline from './Offline';

class SessionView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: null
        };
    }

    loginCallback(data) {
        this.setState({"message": "Login in process..."})

        if (data["type"] === "classic") {
            console.log("Attempt classic login");
        } else {
            console.log("Attempt social login");
        }
    }

    render() {
        if (this.props.app.isUserAuthenticated()) {
            return <div className="app-sessionView w3-container">
                SessionView
            </div>

        } else {
            return <div className="app-sessionView w3-container">
                <Offline
                    message={this.state.message}
                    loginCallback={this.loginCallback.bind(this)}
                />
            </div>
        }
    }
}

export default SessionView;