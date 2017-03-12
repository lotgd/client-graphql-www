import React from 'react';

import Message from './parts/Message';
import ThreeColumnLayout from './parts/ThreeColumnLayout';
import Form from './../../src/Form';

class Offline extends React.Component {
    onSubmit(type, state) {
        state["type"] = type;

        this.props.loginCallback(state);
    }

    render() {
        const form = [
            {type: "email", label: "email address", fieldName: "email", defaultValue: "admin"},
            {type: "password", label: "password", fieldName: "password", defaultValue: "12345"},
        ];

        const middle = <div className="d-loginPrompt">
            <h2>Login Form</h2>

            {this.props.message && <Message isError={this.props.error} message={this.props.message} />}

            <Form
                fields={form}
                submitButton="Log In"
                onSubmit={this.onSubmit.bind(this, "classic")}
            />
        </div>;

        return <ThreeColumnLayout
            middle={middle}
        />
    }
}

export default Offline;