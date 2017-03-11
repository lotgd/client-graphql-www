import React from 'react';

import Offline from './Offline';

class SessionView extends React.Component {
    constructor(props) {
        super(props);

        this.logIn.bind(this)
    }

    logIn(a) {
        console.log(a);
    }

    render() {
        if (this.props.app.isUserAuthenticated()) {
            return <div className="app-sessionView w3-container">
                SessionView
            </div>

        } else {
            return <div className="app-sessionView w3-container">
                <Offline
                    loginCallback={this.logIn}
                />
            </div>
        }
    }
}

export default SessionView;