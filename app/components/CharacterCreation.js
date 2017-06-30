import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'react-apollo';

import Message from './parts/Message';
import Form from './../../src/Form';


class CharacterCreation extends Component {
    static PropType = {
        userId: PropTypes.string.isRequired,
        displayForm: PropTypes.bool.isRequired,
        onCreate: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
    }

    render() {
        const form = [
            {type: "text", label: "character name", fieldName: "name", defaultValue: ""}
        ];

        return <div>
            <CreationButton toggle={this.props.toggled} onClick={this.props.onToggle} />

            {this.props.creationMessage && this.props.toggled && <Message
                message={this.props.creationMessage}
                error={this.props.creationError}
            />}

            {this.props.toggled && <Form
                fields={form}
                submitButton="Create"
                onSubmit={this.props.onCreate}
            />}
        </div>;
    }
}

function CreationButton(props) {
    const content = props.toggle ? "^" : "+";

    return (
        <div className="d-roundButton" onClick={() => {props.onClick();}}>{content}</div>
    );
}

export default CharacterCreation;