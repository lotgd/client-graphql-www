import React from 'react';
import Relay from 'react-relay';

import AuthWithPasswordMutation from '../mutations/AuthWithPasswordMutation';

var Offline = React.createClass({
    handleSubmission: function() {
        this.props.relay.commitUpdate(
            new AuthWithPasswordMutation({
                email: this.state.email,
                password: this.state.password
            }), {
                onFailure: this.onSubmissionError, 
                onSuccess: this.onSubmissionSuccess
            }
        );

        this.setState({"submitted" : true});
    },
    
    onSubmissionSuccess: function(transaction) {
        console.log("Authentication with password was possible.");
        console.log(transaction);
        
        this.setState({
            error: false,
            loggedIn: true
        });
        
        this.props.parent.setApiKeyInRelayHeader(transaction["authWithPassword"]["session"]["apiKey"]);
        this.props.parent.setState({
            session: transaction["authWithPassword"]["session"]
        });
    },
    
    onSubmissionError: function(transaction) {
        this.setState({
            error: true,
            loggedIn: false,
        });
    },
    
    getInitialState: function() {
        return {
            email: "admin",
            password: "12345",
            submitted: null,
            error: false,
            loggedIn: true
        };
    },
    
    handleChange: function(field, e) {
        var nextState = {};
        nextState[field] = e.target.value;
        
        this.setState(nextState);
    },
    
    render: function() {        
        return (
            <div className="w3-row">
                <div className="w3-col l4 m2 s1">&nbsp;</div>
                <div className="login-prompt w3-col l4 m8 s10">
                    <h2>Login form</h2>
                    
                    {this.state.submitted
                        ? this.state.error 
                                ? <div>Login was not possible.</div>
                                : <div>Login in, please wait.</div>
                        : <div>Try to login using your email/password!</div>
                    }
                    <div className="w3-container">
                        <label>E-Mail address</label>
                        <input 
                            className="w3-input" 
                            type="text" 
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange.bind(this, 'email')}
                        />

                        <label>Password</label>
                        <input 
                            className="w3-input" 
                            type="password" 
                            name="password" 
                            value={this.state.password}
                            onChange={this.handleChange.bind(this, 'email')}
                        />
                        
                        <button className="w3-button" onClick={this.handleSubmission}>Log in</button>
                    </div>
                    
                    <h2>Social auth</h2>
                </div>
                <div className="w3-col l4 m2 s1">&nbsp;</div>
            </div>
        );
   }
   
});

export default Relay.createContainer(Offline, {
    fragments: {
        
    }
});