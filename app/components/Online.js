import React from 'react';
import Relay from 'react-relay';

var Online = React.createClass({
    getInitialState() {
        return  {
            session: this.props.session
        };
    },
    
    render: function() {
        var Session = this.props.session;
        
        return (
            <div className="w3-row">
                <div className="w3-col l4 m2 s1">&nbsp;</div>
                <div className="login-prompt w3-col l4 m8 s10">
                    You are online.
                    And you are thus named {Session.user.name}.
                </div>
                <div className="w3-col l4 m2 s1">&nbsp;</div>
            </div>
        );
   }
   
});

export default Relay.createContainer(Online, {
    fragments: {
    }
});